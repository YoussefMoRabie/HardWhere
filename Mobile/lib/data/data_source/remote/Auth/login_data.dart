import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class LoginData {
  Crud crud;
  LoginData(this.crud);
  getData(String email,String password ) async {
    var response = await crud.getData("${AppLink.login}?email=$email&password=$password");
    return response.fold((l) => l, (r) => r);
  }
}