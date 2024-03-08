import axios from 'axios';
import { ApiConstants } from '../contants';


const AuthRequest = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL
});

const register = async user => {
  console.log("API:", ApiConstants.BACKEND_API.REGISTER)
  if (!user?.firstName || !user?.lastName || !user?.email || !user?.password || !user?.phoneNumber) {
    return { status: false, message: 'Please fill up all fields' };
  }
  try {
    let requestBody = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
      phoneNumber: user?.phoneNumber
    };
    console.log("RegisterService working..", requestBody)

    let registerResponse = await AuthRequest.post(
      ApiConstants.BACKEND_API.REGISTER,
      requestBody
    );
    
    console.log(registerResponse?.data);
    console.log("Done✅");
    return registerResponse?.data;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Something went wrong' };
  }
};

const login = async user => {
  if (!user?.email || !user?.password) {
    return { status: false, message: 'Please fill up all fields' };
  }
  try {
    let requestBody = {
      email: user?.email,
      password: user?.password
    };
    let loginResponse = await AuthRequest.post(
      ApiConstants.BACKEND_API.LOGIN,
      requestBody
    );
    
    console.log("Login Successful✅");
    
    return loginResponse?.data;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Something went wrong' };
  }
}

const forgotPassword = async user => {

  if(!user?.email){
    return {status :false ,message:'Email field is empty'}
  }
  try{
    let requestBody ={
      email: user?.email
    }

    let forgotPassword = await AuthRequest.post(
      ApiConstants.BACKEND_API.FORGOT_PASSWORD,requestBody
    );
    console.log(forgotPassword?.data);
    return forgotPassword?.data;
    
  }catch(err){
    console.log('Error in Forgot Password', err.response.data);
    return { status: false, message: 'Something went wrong' };
  }

}

export default { register, login, forgotPassword };
