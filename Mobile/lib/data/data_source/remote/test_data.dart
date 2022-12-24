import '../../../API.dart';
import '../../../core/class/curd.dart';

class TestData {
  Crud crud;
  TestData(this.crud);
  getData() async {
    var response = await crud.postData(AppLink.offers, {});
    return response.fold((l) => l, (r) => r);
  }
}