import React, {useState} from 'react';
import { Text,Toast, Button } from "native-base";
import {
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import CachedImage from '../../helpers/CachedImage';
import artCardStyle from '../../../styles/artCard';
import { colors } from '../../../styles/variables';
import Icon from "react-native-vector-icons/Ionicons";
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconMatCom from "react-native-vector-icons/MaterialCommunityIcons";

import { AsyncStorage } from 'react-native';

import Comment from "./Comment";

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const showInfographic = function(text) {
  Toast.show({
    text: text,
    position: 'bottom',
    duration: 500
  })
}

export default ArtCard = ({comp, postTag, user, postNewComment, ogUser, comments, users}) => {
  if (!ogUser) {
    AsyncStorage.clear()
    console.log("==|==|> cleared storage")
  }

  let [showComments, setShowComments] = useState(false);
  let [newComment, setNewComment] = useState('');

  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const imgUrl = 'https://arzmkdmkzm.cloudimg.io/width/' + screenWidth + '/x/' + comp.img_url;

  const bookmark = (comp, postTag) => {
    return (
       <IconMat
        name={comp.seelist ? "bookmark" : "bookmark-border"}
        color={comp.seelist ? colors.seen : colors.color1}
        size={26}
        artID={comp.id}
        userID={comp.user_id}
        onPress={() => postTag(comp.id, "seelist", !comp.seelist, user.id)}
        style={artCardStyle.icons}
      />
    )
  };

  const heart = (comp, postTag) => {
    return (
      <Icon
      name={comp.liked ? "ios-heart" : "ios-heart-empty"}
      color={comp.liked ? colors.like : colors.color1}
      size={26}
      artID={comp.id}
      userID={comp.user_id}
      onPress={() => postTag(comp.id, "liked", !comp.liked, user.id)}
      style={artCardStyle.icons}
    />
    )
  } 

  const map = (comp, postTag) => {
    return (
      <Icon
        name={comp.visited ? "ios-map" : "ios-pin"}
        color={comp.visited ? colors.bookmark : colors.color1}
        size={26}
        artID={comp.id}
        userID={comp.user_id}
        onPress={() => postTag(comp.id, "visited", !comp.visited, user.id)}
        style={artCardStyle.icons}
      />
    )
  } 

  const comment = () => {
    return (
      <IconMatCom
        name="comment-outline"
        size={26}
        color={colors.color1}
        style={{ marginRight: 15 }}
        onPress={() => {
          toggleComments();
        }}
      />
    );
  }

  const renderComments = () => {
    if (comments) {
      return comments.map((comment, idx) => {
        return (
          <Comment key={idx} comment={comment} username={users[comment.user_id].name} />
        )
      })
    } else {
      return null
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={500}
      enabled
    >
      <View style={artCardStyle.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <Text style={artCardStyle.head}>{ogUser.name || 'Art peace!'}</Text>
          {ogUser.avatar && <CachedImage style={{...artCardStyle.headImage, width: 35, height: 35, resizeMode: 'cover'}} 
            source={ogUser.avatar}
            title={ogUser.email}
            height={35}
          />}
        </View>
        {/* <Image source={{ uri: imgUrl }} style={{ width: screenWidth, height: screenWidth }} /> */}
        <CachedImage
          source={imgUrl}
          title={comp.id}
          style={{ width: screenWidth, height: screenWidth }}
          height={screenWidth}
        />
        <Text style={artCardStyle.title}>{comp.title || 'Art peace!'}</Text>
        {/* <Image style={{ width: screenWidth, height: screenWidth }} {...{preview, imgUrl}} /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={artCardStyle.iconContainer}>
            {heart(comp, postTag)}
            {map(comp, postTag)}
            {bookmark(comp, postTag)}
          </View>
          <View style={{ marginRight: 10 }}>{comment()}</View>
        </View>
        {showComments && (
          <View>
            <View>{renderComments()}</View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TextInput
                style={{ fontSize: 15, marginLeft: 10 }}
                placeholder="Add a comment"
                value={newComment}
                onChangeText={text => setNewComment(text)}
              />

              <Button
                onPress={() => {
                  postNewComment(comp.id, user.id, newComment);
                  setNewComment("");
                }}
                transparent
              >
                <Text style={{ color: "grey" }}>Post</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
        {/* <View style={{ flex: 1, width: screenWidth, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={artCardStyle.line}>____________________________________</Text>
        </View> */}
    </KeyboardAvoidingView>
  );
}