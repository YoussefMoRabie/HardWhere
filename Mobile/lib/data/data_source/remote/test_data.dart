import '../../../API.dart';
import '../../../core/class/curd.dart';

class TestData {
  Crud crud;
  TestData(this.crud);
  getData() async {
    var response = await crud.postData(AppLink.signUp,   {
      "firstName": "kkkkk",
      "lastName": "kkk",
      "password":"123456",
      "phone":"266012",
      "address":"03",
      "email":"ll6655@ll.ll"
    });
    return response.fold((l) => l, (r) => r);
  }
}