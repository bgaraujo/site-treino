import {database} from "../Firebase";

export const setUser = (uid) => {
    return { type: 'UID',data:uid }
}

export const navigation = (page) => {
    return { type:'NAVIGATE',data:page }
}

export const tabNavigation = (tab) => {
    return { type:'TAB',data:tab }
}

export const getPosts = () => {
    var arrPosts = [];
    database.ref('posts').orderByChild("active").equalTo(true).on("child_added", (snapshot) => {
      var post = snapshot.val();
      post.id = snapshot.key;
      arrPosts.push(post)
    });
    return { type:'FEED_POSTS',data:arrPosts}
}