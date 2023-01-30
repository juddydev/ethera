/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import {Box, Image, Text} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {textStyles} from '../../../docs/config';
import {formatBytes} from '../../helpers/chat/formatBytes';
import {MessageSize} from './MessageSize';

interface ImageMessageProps {
  url: any;
  size: any;
  onLongPress?: any;
  onPress: any;
  nftId?: string;
  nftName?: string;
}

export const ImageMessage = ({
  url,
  size,
  onLongPress,
  onPress,
  nftId,
  nftName,
}: ImageMessageProps) => {
  const formatedSize = formatBytes(parseFloat(size), 2);
  return (
    <>
      {!!nftId && (
        <Text
          color={'white'}
          fontWeight={'bold'}
          fontFamily={textStyles.boldFont}>
          🔗🖼️ NFT: {nftName}
        </Text>
      )}
      <TouchableOpacity
        onLongPress={onLongPress}
        accessibilityLabel={'Image Attachment'}
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          borderRadius: 5,
          justifyContent: 'center',
          position: 'relative',
        }}>
        {size && (
          <MessageSize size={formatedSize.size + ' ' + formatedSize.unit} />
        )}
        {!!nftId && <MessageSize size={'NFT'} />}
        <Box p={'1.5'}>
          <FastImage
            style={{
              width: hp('22%'),
              height: hp('22%'),
              borderRadius: 10,
              borderColor: 'white',
              borderWidth: nftId ? 2 : 0,
            }}
            source={{uri: url}}
            alt={'Image message'}
          />
        </Box>
      </TouchableOpacity>
    </>
  );
};
