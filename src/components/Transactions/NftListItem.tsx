/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {imageMimetypes, videoMimetypes} from '../../constants/mimeTypes';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  coinImagePath,
  commonColors,
  defaultBotsList,
  textStyles,
} from '../../../docs/config';
import FastImage from 'react-native-fast-image';
import {NFMT_TRAITS, NFMT_TYPES} from '../../stores/walletStore';
import {HStack, VStack} from 'native-base';
import {createPrivateChat} from '../../helpers/chat/createPrivateChat';
import {useStores} from '../../stores/context';

interface NftListItemProps {
  assetUrl: string;
  assetsYouHave: string;
  totalAssets: string;
  name: string;
  onClick: any;
  nftId: string;
  index: number;
  item: any;
  mimetype: string;
  itemSelected: boolean;
  onAssetPress?: () => void;
}

const NfmtTag = ({tag}: {tag: string}) => {
  return (
    <HStack
      style={{backgroundColor: NFMT_TRAITS[tag].color || 'green'}}
      paddingX={2}
      borderRadius={5}
      marginX={1}
      paddingY={0.5}
      marginTop={0.5}>
      <Text style={{color: 'white'}}>{tag}</Text>
    </HStack>
  );
};

export const NftListItem = (props: NftListItemProps) => {
  const {
    assetUrl,
    assetsYouHave,
    totalAssets,
    name,
    onClick,
    nftId,
    index,
    item,
    mimetype,
    itemSelected,
    onAssetPress,
  } = props;
  const {loginStore, apiStore, chatStore} = useStores();
  const onGetCollectionPress = () => {
    const bot = defaultBotsList.find(item => item.name === 'Merchant Bot');
    const {} = createPrivateChat(
      loginStore.initialData.walletAddress,
      bot.name,
      loginStore.initialData.firstName,
      bot.name,
      apiStore.xmppDomains.CONFERENCEDOMAIN,
      chatStore.xmpp,
    );
  };

  return (
    <View
      onPress={onClick}
      style={[
        styles.container,
        {backgroundColor: itemSelected ? 'rgba(0,0,0,0.15)' : '#F4F5F8'},
        item.tokenType === 'NFMT' && {
          borderWidth: 1,
          borderColor: NFMT_TYPES[item?.nfmtType]?.color,
        },
      ]}>
      <View style={styles.justifyAround}>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            {imageMimetypes[mimetype] || videoMimetypes[mimetype] ? (
              <TouchableWithoutFeedback onPress={onAssetPress}>
                <FastImage
                  style={styles.image}
                  source={{
                    // @ts-ignore
                    uri: assetUrl,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={onAssetPress}>
                <AntIcon
                  name={'playcircleo'}
                  color={commonColors.primaryColor}
                  size={hp('5%')}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
          <TouchableWithoutFeedback onPress={onClick} style={{height: '100%'}}>
            <View>
              <Text style={styles.itemName}>{name}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback onPress={onClick}>
          <View style={styles.itemCount}>
            <VStack>
              {item?.traits &&
                !item.isCollection &&
                item.traits.map((trait, i) => {
                  return <NfmtTag tag={trait} key={item} />;
                })}
            </VStack>
            <View>
              <Text style={{color: 'black'}}>
                <Text
                  style={{
                    color: item.isCollection ? 'green' : 'black',
                    fontFamily: item.isCollection
                      ? textStyles.semiBoldFont
                      : '',
                  }}>
                  {assetsYouHave}
                </Text>
                /{totalAssets}
              </Text>
              {item.isCollection && (
                <Text style={{color: 'black'}}>
                  <Image source={coinImagePath} style={styles.tokenIconStyle} />
                  {Math.min(...item.costs)} -{' '}
                  <Image source={coinImagePath} style={styles.tokenIconStyle} />
                  {Math.max(...item.costs)}
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: hp('8.62%'),
    width: '100%',
    // backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F4F5F8',
    backgroundColor: '#F4F5F8',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
  },
  justifyAround: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  itemContainer: {
    // width: wp('100%'),

    // backgroundColor: '#F4F5F8',
    flexDirection: 'row',
    alignItems: 'center',

    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: wp('24%'),
    // flex: 0.24,
    // marginLeft: wp('13%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontFamily: textStyles.regularFont,
    fontSize: hp('2.2%'),
    color: '#000000',
    marginLeft: 20,
    // alignSelf: 'left'
  },
  itemCount: {
    // backgroundColor: '#F4F5F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 30,
  },
  nfmtStyle: {
    borderWidth: 1,
  },
  tokenIconStyle: {
    height: hp('3%'),
    width: hp('3%'),
  },
});
