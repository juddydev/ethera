import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";
import { IUserAcl } from "../http";

type TUser = {
  firstName: string;
  lastName: string;
  xmppPassword?: string;
  _id: string;
  walletAddress: string;
  token: string;
  refreshToken?: string;
  profileImage?: string;
  ACL?: {
    ownerAccess: boolean;
  };
};

type TMode = "light" | "dark";

type TBalance = {
  balance: number;
  tokenName: string;
  tokenType: string;
  contractAddress: string;
  imagePreview?: string;
  total: number;
};

type TMessage = {
  body: string;
  firsName: string;
  lastName: string;
  wallet: string;
  from: string;
  room: string;
};

export type TMessageHistory = {
  id: number;
  body: string;
  data: {
    isSystemMessage: string;
    photoURL: string;
    quickReplies: string;
    roomJid: string;
    senderFirstName: string;
    senderJID: string;
    senderLastName: string;
    senderWalletAddress: string;
    tokenAmount: string;
    xmlns: string;
  };
  roomJID: string;
  date: string;
  key: number;
};

type TUserChatRooms = {
  jid: string;
  name: string;
  room_background: string;
  room_thumbnail: string;
  users_cnt: string;
};

type TApp = {
  _id: string;
  appName: string;
  appToken: string;
  createdAt: string;
  updatedAt: string;
  defaultAccessAssetsOpen: boolean;
  defaultAccessProfileOpen: boolean;
  usersCanFree: string;
  appGoogleId?: string;
  appLogo?: string;
};

type TAppUser = {
  appId: string;
  firstName: string;
  lastName: string;
  username?: string;
  email?: string;
  defaultWallet: {
    walletAddress: string;
  };
  isAssetsOpen: boolean;
  isProfileOpen: boolean;
  createdAt: string;
  updatedAt: string;
};

interface IStore {
  user: TUser;
  ACL: IUserAcl;
  messages: TMessage[];
  viewMode: TMode;
  balance: TBalance[];
  apps: TApp[];
  appUsers: TAppUser[];
  toggleMode: () => void;
  setUser: (user: TUser) => void;
  setOwner: (owner: TUser) => void;
  clearUser: () => void;
  clearOwner: () => void;
  setBalance: (balance: TBalance[]) => void;
  setNewMessage: (msg: TMessage) => void;
  historyMessages: TMessageHistory[];
  setNewMessageHistory: (msg: TMessageHistory) => void;
  clearMessageHistory: () => void;
  sortMessageHistory: () => void;
  userChatRooms: TUserChatRooms[];
  setNewUserChatRoom: (msg: TUserChatRooms) => void;
  clearUserChatRooms: () => void;
  setApps: (apps: TApp[]) => void;
  setApp: (app: TApp) => void;
  updateApp: (app: TApp) => void;
  deleteApp: (id: string) => void;
  loaderArchive: boolean;
  setLoaderArchive: (status: boolean) => void;
  addAppUsers: (users: TAppUser[]) => void;
  setACL: (acl: IUserAcl) => void;
}

const _useStore = create<IStore>()(
  devtools(
    persist(
      immer((set, get) => {
        return {
          user: {
            firstName: "",
            lastName: "",
            xmppPassword: "",
            _id: "",
            walletAddress: "",
            token: "",
            refreshToken: "",
            profileImage: "",
          },
          ACL: {
            result: {
              application: {
                appCreate: {},
                appPush: {},
                appSettings: {},
                app: {},
                appStats: {},
                appTokens: {},
                appUsers: {},
              },
              network: { netStats: {} },
              createdAt: "",
              updatedAt: "",
              userId: "",
              _id: "",
              appId: "",
            },
          },
          apps: [],
          balance: [],
          viewMode: "light",
          messages: [],
          historyMessages: [],
          loaderArchive: false,
          userChatRooms: [],
          appUsers: [],
          setACL: (acl: IUserAcl) =>
            set((state) => {
              state.ACL = acl;
            }),
          toggleMode: () =>
            set((state) => {
              state.viewMode = state.viewMode === "light" ? "dark" : "light";
            }),
          setUser: (user: TUser) =>
            set((state) => {
              state.user = user;
            }),
          setOwner: (user: TUser) =>
            set((state) => {
              state.user = user;
            }),
          setApps: (apps: TApp[]) =>
            set((state) => {
              state.apps = apps;
            }),
          setApp: (app: TApp) =>
            set((state) => {
              state.apps = [...state.apps, app];
            }),
          updateApp: (app: TApp) =>
            set((state) => {
              const index = state.apps.findIndex((el) => el._id === app._id);
              state.apps.splice(index, 1, app);
              state.apps = [...state.apps];
            }),
          deleteApp: (id: string) =>
            set((state) => {
              const apps = state.apps.filter((app) => app._id !== id);
              state.apps = [...apps];
            }),
          clearApps: () =>
            set((state) => {
              state.apps = [];
            }),
          clearUser: () =>
            set((state) => {
              state.user = {
                firstName: "",
                lastName: "",
                xmppPassword: "",
                _id: "",
                walletAddress: "",
                token: "",
                refreshToken: "",
                profileImage: "",
              };
            }),
          clearOwner: () =>
            set((state) => {
              state.user = {
                firstName: "",
                lastName: "",
                xmppPassword: "",
                _id: "",
                walletAddress: "",
                token: "",
                refreshToken: "",
                profileImage: "",
              };
              state.apps = [];
              state.appUsers = [];
            }),
          setBalance: (balance: TBalance[]) =>
            set((state) => {
              state.balance = balance;
            }),
          setNewMessage: (message: TMessage) =>
            set((state) => {
              state.messages.unshift(message);
            }),
          setNewMessageHistory: (historyMessages: TMessageHistory) =>
            set((state) => {
              state.historyMessages.unshift(historyMessages);
            }),
          setLoaderArchive: (status: boolean) =>
            set((state) => {
              state.loaderArchive = status;
            }),
          clearMessageHistory: () =>
            set((state) => {
              state.historyMessages = [];
            }),
          sortMessageHistory: () =>
            set((state) => {
              state.historyMessages.sort((a: any, b: any) => a.id - b.id);
            }),
          setNewUserChatRoom: (userChatRooms: TUserChatRooms) =>
            set((state) => {
              state.userChatRooms.unshift(userChatRooms);
            }),
          clearUserChatRooms: () =>
            set((state) => {
              state.userChatRooms = [];
            }),
          addAppUsers: (users: TAppUser[]) =>
            set((state) => {
              state.appUsers = [...state.appUsers, ...users];
            }),
        };
      })
    )
  )
);

declare global {
  interface Window {
    useState: any;
  }
}

window.useState = _useStore;

export const useStoreState = _useStore;
