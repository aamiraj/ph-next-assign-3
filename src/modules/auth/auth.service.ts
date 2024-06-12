import User from "../User/user.model";

const signUpUserToDB = async (payload: Record<string, unknown>) => {
  try {
    const newUser = await User.create(payload);
    
    return newUser;
  } catch (error) {
    throw new Error("User registration failed.");
  }
};

export const AuthService = {
  signUpUserToDB,
};
