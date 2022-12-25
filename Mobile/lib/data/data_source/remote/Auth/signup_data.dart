import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class SignupData {
  Crud crud;
  SignupData(this.crud);
  postData(String fName,String lName,String password ,String email ,String phone,String address  ) async {
    var response = await crud.postData(AppLink.signUp, {
      "firstName": fName,
      "lastName": lName,
      "email" : email ,
      "password":password,
      "phone" : phone  ,
      "address":address,
    });
    return response.fold((l) => l, (r) => r);
  }
}