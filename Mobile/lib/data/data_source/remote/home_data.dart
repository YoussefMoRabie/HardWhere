import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class HomeData {
  Crud crud;
  HomeData(this.crud);
  getOffersData() async {
    var response = await crud.getData(AppLink.offers);
    return response.fold((l) => l, (r) => r);
  }
}