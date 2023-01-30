import {HStack, Text, VStack} from 'native-base';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {commonColors, textStyles, unv_url} from '../../../docs/config';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {httpDelete, httpGet} from '../../config/apiService';
import {useStores} from '../../stores/context';
import {shareLink} from '../../config/routesConstants';
import moment from 'moment';
import {generateProfileLink} from '../../helpers/generateProfileLink';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {showSuccess} from '../../components/Toast/toast';
import QRCodeGenerator from '../../components/QRCodeGenerator';
import Modal from 'react-native-modal';

export interface IProfileShareManage {
  onAddPress: Dispatch<SetStateAction<number>>;
}

interface ISharedLink {
  _id: string;
  createdAt: string;
  expiration: string;
  memo: string;
  resource: string;
  token: string;
  updatedAt: string;
  userId: string;
  walletAddress: string;
}

export const ProfileShareManage: React.FC<IProfileShareManage> = ({
  onAddPress,
}) => {
  const [sharedLinks, setSharedLinks] = useState<ISharedLink[]>([]);
  const {loginStore, apiStore} = useStores();
  const [_, setClipboard] = useClipboard();
  const [modalData, setModalData] = useState({visible: false, link: ''});
  const [loading, setLoading] = useState(false);

  const getSharedLinks = async () => {
    setLoading(true);
    try {
      const {data} = await httpGet(
        apiStore.defaultUrl + shareLink,
        loginStore.userToken,
      );
      setSharedLinks(data.items.filter(item => item.resource === 'profile'));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const deleteLink = async (linkToken: string) => {
    try {
      await httpDelete(
        apiStore.defaultUrl + shareLink + linkToken,
        loginStore.userToken,
      );
      await getSharedLinks();
      showSuccess('Success', 'Link deleted');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSharedLinks();
  }, []);

  const showQr = (link: string) => {
    setModalData({visible: true, link});
  };
  const UserItem = ({item}: {item: ISharedLink}) => {
    const link = generateProfileLink({
      firstName: loginStore.initialData.firstName,
      lastName: loginStore.initialData.lastName,
      walletAddress: item.walletAddress,
      xmppId:
        loginStore.initialData.xmppUsername + '@' + apiStore.xmppDomains.DOMAIN,
      linkToken: item.token,
    });
    return (
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        style={{marginBottom: 20}}>
        <VStack>
          <Text style={styles.linkName}>{item.memo}</Text>
          <Text style={styles.linkDate}>
            Created at: {moment(item.createdAt).format('MMMM DD YYYY, hh:mm')}
          </Text>
          <Text style={styles.linkDate}>
            Expires:{' '}
            {+item.expiration !== -1
              ? moment(item.expiration).format('MMMM DD YYYY hh:mm')
              : ''}
          </Text>
        </VStack>
        <HStack>
          <TouchableOpacity
            onPress={() => showQr(link)}
            style={styles.actionButton}>
            <AntDesignIcons name="qrcode" size={35} color={'black'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setClipboard(unv_url + link);
            }}
            style={styles.actionButton}>
            <AntDesignIcons name="copy1" size={35} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteLink(item.token)}
            style={styles.actionButton}>
            <MaterialIcons name="delete" size={35} color={'darkred'} />
          </TouchableOpacity>
        </HStack>
      </HStack>
    );
  };
  const renderItem = ({item}: {item: ISharedLink}) => <UserItem item={item} />;

  return (
    <VStack paddingX={5}>
      <View style={{marginTop: 10, marginBottom: 20}}>
        <HStack justifyContent={'space-between'} mb={5}>
          <Text style={styles.title}>Current Profile Shares</Text>
          <TouchableOpacity
            onPress={() => onAddPress(1)}
            style={styles.addButton}>
            <HStack alignItems={'center'}>
              <AntDesignIcons name="plus" color={'white'} size={20} />
              <Text style={{color: 'white', fontFamily: textStyles.mediumFont}}>
                Add a share
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
        <Text style={styles.description}>
          Listed below are your currently active profile sharing links. You can
          share or delete them.
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        {loading && (
          <ActivityIndicator size={40} color={commonColors.primaryDarkColor} />
        )}
        {sharedLinks.length ? (
          <FlatList
            data={sharedLinks}
            renderItem={renderItem}
            keyExtractor={item => item?.token.toString()}
          />
        ) : (
          <>
            {!loading && (
              <Text style={styles.title}>You have no shared links...</Text>
            )}
          </>
        )}
      </View>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        isVisible={modalData.visible}
        onBackdropPress={() => setModalData({visible: false, link: ''})}>
        <QRCodeGenerator shareKey={modalData.link} close={() => {}} />
      </Modal>
    </VStack>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: textStyles.semiBoldFont,
    color: 'black',
    fontSize: 18,
    marginVertical: 5,
  },
  description: {
    fontFamily: textStyles.regularFont,
    color: 'black',
  },
  addButton: {
    backgroundColor: commonColors.primaryColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actionButton: {
    marginRight: 5,
  },
  linkName: {
    color: 'black',
    width: '90%',
    fontFamily: textStyles.semiBoldFont,
    fontSize: 18,
  },
  linkDate: {
    fontFamily: textStyles.regularFont,
    color: 'black',
    fontSize: 12,
  },
});
