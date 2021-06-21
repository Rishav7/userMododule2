import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import path from 'path'


// @desc   register a new Profile
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
// @desc    Login User with auth & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      photo: user.photo,
     email: user.email,
       isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    get user & get token
// @route   POST /api/users/login
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


// @desc   regis ter a new Profile
// @route   put /api/users/profile
// @access  protected

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (user) {

    user.name = req.body.name || user.name
    user.email = req.body.email || user.name

    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')

  }
})

const uploadProfilePic = asyncHandler(async (req, res) => {

  let user = await User.findById(req.params.id);
  if (!user) return({ status: 404, message: 'User not found' })

  if (!req.files) return ({ status: 404, message: 'Please upload file' })


  const file = req.files.file

  console.log(file.name);
  file.name = `pic_${user._id}${path.parse(file.name).ext}`

  console.log(file.name);

  file.mv(`${process.env.FILE_UPLOADS_DIR} ${file.name}`, async (err) => {
    console.log("sdklfh")
    if (err)
      return
    ({
      status: 500,
      message: 'Cant upload file'
    })

    const result = await User.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.json({ success: true, data: file.name })
  })
})

export { authUser, registerUser, getUserProfile, updateUserProfile, uploadProfilePic }
