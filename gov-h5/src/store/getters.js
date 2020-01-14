const getters = {
  tag: state => state.tags.tag,
  /* USER */
  isLogin: state => state.user.isLogin,
  user: state => state.user.user,
  token: state => state.user.token
}
export default getters
