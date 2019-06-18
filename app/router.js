module.exports = app => {
  const { router, controller } = app
  router.get('/user/:id', controller.user.getById)
  router.get('/user', controller.user.getAll)
  router.post('/user/query', controller.user.query)
}
