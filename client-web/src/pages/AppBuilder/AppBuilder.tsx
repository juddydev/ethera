import { useEffect, useRef, useState } from "react";
import AppMock from "../../components/AppBuilder/AppMock";
import { Box, Button, TextField, Typography } from "@mui/material";
import { httpWithAuth, updateAppSettings } from "../../http";
import { useParams } from "react-router";
import { intervalToDuration } from "date-fns";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "../../context/SnackbarContext";
import { useStoreState } from "../../store";
import {
  isValidHexCode,
  replaceNotAllowedCharactersInDomain,
} from "../../utils";
import { config } from "../../config";
import useDebounce from "../../hooks/useDebounce";

export interface TCustomDetails {
  primaryColor: string;
  secondaryColor: string;
  coinSymbol: string;
  coinName: string;
  currentScreenIndex: number;
  changeScreen: (i: number) => void;

  logo: string;
  loginScreenBackground: string;
  coinLogo: string;
}

type BuildStage = "prepare" | "preparing" | "download";

type IFile = {
  file?: File;
  url: string;
};

export default function AppBuilder() {
  const { appId } = useParams<{ appId: string }>();
  const app = useStoreState((s) => s.apps.find((app) => app._id === appId));
  const updateApp = useStoreState((s) => s.updateApp);

  const [displayName, setDisplayName] = useState(app.displayName || "");
  const [bundleId, setBundleId] = useState("com.ethora");
  const [logo, setLogo] = useState<IFile>({
    file: undefined,
    url: app.logoImage || "",
  });
  const [loginScreenBackground, setLoginScreenBackground] = useState({
    file: undefined,
    value: app?.loginScreenBackgroundImage || "",
  });
  const [coinLogo, setCoinLogo] = useState<IFile>({
    file: undefined,
    url: app?.coinImage || "",
  });

  const [primaryColor, setPrimaryColor] = useState(app.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(app.secondaryColor);
  const [coinSymbol, setCoinSymbol] = useState("");
  const [coinName, setCoinName] = useState("Coin");

  const [domain, setDomain] = useState(`${app.domainName}`);
  const debouncedDomain = useDebounce<string>(domain, 500);
  const [loading, setLoading] = useState(true);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [buildStage, setBuildStage] = useState<BuildStage>("prepare");
  const [fileTimeToLive, setFileTimeToLive] = useState<Duration>({
    hours: 0,
    minutes: 0,
  });
  const [domainNameError, setDomainNameError] = useState(false);
  const { showSnackbar } = useSnackbar();
  const loginScreenBgRef = useRef<HTMLInputElement>(null);
  const appLogoRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      if (debouncedDomain && debouncedDomain !== app.domainName) {
        validateDomainName(debouncedDomain);
      }
    },
    [debouncedDomain] // Only call effect if debounced search term changes
  );

  const checkBuild = async () => {
    setLoading(true);

    try {
      const res = await httpWithAuth().get("/mobile/check-custom-src/" + appId);

      if (res.data?.isExists) {
        const expiryDate = new Date(res.data.fileStats.birthtime);
        expiryDate.setDate(expiryDate.getDate() + 1);
        const diffInMs = expiryDate.getTime() - new Date().getTime();
        if (diffInMs <= 0) {
          setLoading(false);

          setBuildStage("prepare");
          return;
        }
        const timeToLive = intervalToDuration({
          start: 0,
          end: diffInMs,
        });

        setBuildStage("download");

        setFileTimeToLive(timeToLive);
      }
    } catch (error) {
      showSnackbar(
        "error",
        "Cannot make build" + (error?.response?.data?.error || "")
      );
      console.log(error);
    }
    setLoading(false);
  };

  const getBuild = async () => {
    setLoading(true);

    try {
      const res = await httpWithAuth().get("/mobile/get-custom-src/" + appId, {
        responseType: "blob",
      });
      let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
      const fileName = "client-reactnative.zip";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.click();
      link.remove();
    } catch (error) {
      showSnackbar(
        "error",
        "Cannot make build" + (error?.response?.data?.error || "")
      );

      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    checkBuild();
  }, []);
  const handleLoginScreenBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const l = event.target.files[0];
    setLoginScreenBackground({ file: l, value: URL.createObjectURL(l) });
    event.target.files = null;
    event.target.value = null;
  };
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const l = event.target.files[0];
    setLogo({ file: l, url: URL.createObjectURL(l) });
  };

  const handleCoinLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const l = event.target.files[0];
    setCoinLogo({ file: l, url: URL.createObjectURL(l) });
  };

  const validateDomainName = async (domainName: string) => {
    try {
      const res = await httpWithAuth().post("apps/check-domain-name", {
        domainName,
      });
      // console.log(res);
      // setDomain(`${domainName}`);
      setDomainNameError(false);
    } catch (error) {
      console.log(error);
      if (domainName !== app.domainName) {
        setDomainNameError(true);
      }
    }
  };

  const saveSettings = async () => {
    const data = new FormData();

    bundleId && data.append("bundleId", bundleId);
    displayName && data.append("displayName", displayName);
    domain && data.append("domainName", domain);
    primaryColor && data.append("primaryColor", primaryColor);
    secondaryColor && data.append("secondaryColor", secondaryColor);
    coinSymbol && data.append("coinSymbol", coinSymbol);
    coinName && data.append("coinName", coinName);
    coinLogo.file && data.append("coinLogoImage", coinLogo.file);
    logo.file && data.append("logoImage", logo.file);
    loginScreenBackground.file &&
      data.append("loginScreenBackgroundImage", loginScreenBackground.file);
    loginScreenBackground.value &&
      isValidHexCode(loginScreenBackground.value) &&
      data.append("loginScreenBackgroundImage", loginScreenBackground.value);
    setLoading(true);
    try {
      const res = await updateAppSettings(appId, data);
      updateApp(res.data.result);
    } catch (error) {
      showSnackbar("error", "Cannot save settings");
      console.log({ error });
    }
    setLoading(false);
  };

  const handleAppNameChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDisplayName(value);

    const transformedDomain = replaceNotAllowedCharactersInDomain(
      value.toLowerCase().split(" ").join("")
    );
    setDomain(transformedDomain);
    try {
    } catch (error) {}
  };
  const handleDomainNameChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDomain(value);

    try {
    } catch (error) {}
  };

  const prepareRnBuild = async () => {
    if (
      !bundleId ||
      !isValidHexCode(primaryColor) ||
      !isValidHexCode(secondaryColor)
    ) {
      return;
    }
    setBuildStage("preparing");
    setLoading(true);

    const data = new FormData();
    bundleId && data.append("bundleId", bundleId);
    displayName && data.append("displayName", displayName);
    primaryColor && data.append("primaryColor", primaryColor);
    secondaryColor && data.append("secondaryColor", secondaryColor);
    coinSymbol && data.append("coinSymbol", coinSymbol);
    coinName && data.append("coinName", coinName);
    coinLogo.file && data.append("coinLogoImage", coinLogo.file);
    logo.file && data.append("logoImage", logo.file);
    loginScreenBackground.file &&
      data.append("loginScreenBackgroundImage", loginScreenBackground.file);
    loginScreenBackground.value &&
      isValidHexCode(loginScreenBackground.value) &&
      data.append("loginScreenBackgroundImage", loginScreenBackground.value);
    try {
      const res = await httpWithAuth().post(
        "/mobile/src-builder/" + appId,
        data
      );
      await checkBuild();
      setBuildStage("download");
    } catch (error) {
      setBuildStage("prepare");
      console.log(error);
      showSnackbar("error", "Something went wrong");
    }
    setLoading(false);
  };
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row" },
          justifyContent: "center",
          gap: 10,
          // justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>
            General Appearance
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 3,
            }}
          >
            <Box>
              <TextField
                margin="dense"
                fullWidth
                label="Main Color"
                name="mainColor"
                variant="outlined"
                placeholder="#ffffff"
                InputLabelProps={{ shrink: true }}
                type={"color"}
                value={primaryColor}
                error={!isValidHexCode(primaryColor)}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </Box>

            <Box>
              <TextField
                margin="dense"
                fullWidth
                label="Display Name"
                name="displayName"
                variant="outlined"
                value={displayName}
                onChange={handleAppNameChange}
              />
            </Box>

            <Box>
              <TextField
                margin="dense"
                fullWidth
                label="Secondary Color"
                name="secondaryColor"
                variant={"outlined"}
                type={"color"}
                InputLabelProps={{ shrink: true }}
                placeholder="#ffffff"
                value={secondaryColor}
                error={!isValidHexCode(secondaryColor)}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </Box>
            <Box>
              <TextField
                margin="dense"
                fullWidth
                label="Coin Name"
                name="coinName"
                variant="outlined"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
                helperText={
                  "Name of your internal coin used for gamification and token economy. Leave “Coin” if unsure."
                }
              />
            </Box>
            {/* <Box sx={{ gridColumn: "1/3" }}>
              <TextField
                fullWidth
                margin="dense"
                label="Coin symbol (3-4 letters)"
                name="coinSymbol"
                variant="outlined"
                value={coinSymbol}
                onChange={(e) => setCoinSymbol(e.target.value)}
              />
            </Box> */}
            <Box sx={{ mb: 2, mt: 1, position: "relative" }}>
              <Typography>App Logo</Typography>

              <input
                onChange={handleLogoChange}
                ref={appLogoRef}
                type="file"
                style={{ display: "none" }}
              />
              <Button
                // disabled={loading}
                color="primary"
                variant="outlined"
                onClick={() => appLogoRef?.current?.click()}
              >
                {logo?.file?.name || "Upload File"}
              </Button>
              <Typography
                sx={{ fontSize: 12, position: "absolute", bottom: 10,color: 'rgba(0, 0, 0, 0.6)' }}
              >
                Recommended size: 500px x 500px
              </Typography>
            </Box>
            <Box sx={{ mb: 2, mt: 1 }}>
              <input
                onInput={handleLoginScreenBackgroundChange}
                ref={loginScreenBgRef}
                type="file"
                style={{ display: "none" }}
              />
              <Typography>Login Screen Background</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  // disabled={loading}
                  color="primary"
                  variant="outlined"
                  onClick={() => loginScreenBgRef?.current?.click()}
                  sx={{ maxWidth: "200px", minWidth: 150 }}
                >
                  {loginScreenBackground?.file?.name || "Upload File"}
                </Button>
                <Typography>OR</Typography>
                <TextField
                  margin="dense"
                  fullWidth
                  label="Login Screen Color"
                  name="loginScreenColor"
                  variant={"outlined"}
                  type={"color"}
                  InputLabelProps={{ shrink: true }}
                  placeholder="#ffffff"
                  value={
                    isValidHexCode(loginScreenBackground.value)
                      ? loginScreenBackground.value
                      : "#fffff"
                  }
                  error={!isValidHexCode(secondaryColor)}
                  onChange={(e) =>
                    setLoginScreenBackground({
                      file: undefined,
                      value: e.target.value,
                    })
                  }
                  sx={{ minWidth: 150 }}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>
              Mobile App
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
              <TextField
                margin="dense"
                fullWidth
                label="Bundle ID"
                name="bundleId"
                variant="outlined"
                onChange={(e) => setBundleId(e.target.value)}
                value={bundleId}
                helperText={
                  "Bundle ID should be unique to identify your app for Appstore and other purposes."
                }
              />
              {buildStage === "download" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    position: "relative",
                    mt: 1
                  }}
                >
                  <Button
                    onClick={getBuild}
                    variant="contained"
                    color={"success"}
                    sx={{ width: 300, height: 50 }}
                  >
                    Download React Native build
                  </Button>
                  <Typography
                    sx={{ fontSize: 12,color: 'rgba(0, 0, 0, 0.6)'}}
                  >
                    Expires in {fileTimeToLive && fileTimeToLive.hours + "h"}{" "}
                    {fileTimeToLive && fileTimeToLive.minutes + "m"}
                  </Typography>
                </Box>
              ) : (
                <LoadingButton
                  loading={loading}
                  disabled={buildStage === "preparing"}
                  onClick={prepareRnBuild}
                  sx={{ width: 300, height: 50 }}
                  variant="contained"
                >
                  {buildStage === "preparing" ? "Preparing" : "Prepare"} React
                  Native build
                </LoadingButton>
              )}
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>Web App</Typography>
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <TextField
              margin="dense"
              label="Domain Name"
              name="domain"
              variant="outlined"
              onChange={handleDomainNameChange}
              value={domain}
              error={domainNameError}
              helperText={
                domainNameError
                  ? "❌ name not available, please fill in something more unique here"
                  : app.domainName === domain
                  ? ""
                  : "✅ available"
              }
            />
            <Typography
              style={{ marginBottom: app.domainName !== domain ? "20px" : 0 }}
            >
              {"." + config.DOMAIN_NAME}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mt: 2 }}>
            <LoadingButton
              loading={loading}
              disabled={loading || domainNameError}
              onClick={saveSettings}
              variant="contained"
              sx={{ padding: "10px 40px" }}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>

        <AppMock
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          logo={logo.url}
          loginScreenBackground={loginScreenBackground.value}
          coinLogo={coinLogo.url}
          coinSymbol={coinSymbol}
          coinName={coinName}
          currentScreenIndex={currentScreenIndex}
          changeScreen={setCurrentScreenIndex}
        />
      </Box>
    </main>
  );
}
