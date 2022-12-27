import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class CatData {
  Crud crud;
  CatData(this.crud);
  getLaptopsData() async {
    var response = await crud.getData(AppLink.laptops);
    return response.fold((l) => l, (r) => r);
  }
  getScreensData() async {
    var response = await crud.getData(AppLink.screens);
    return response.fold((l) => l, (r) => r);
  }
  getMobilesData() async {
    var response = await crud.getData(AppLink.mobiles);
    return response.fold((l) => l, (r) => r);
  }
  getHeadphonesData() async {
    var response = await crud.getData(AppLink.headphones);
    return response.fold((l) => l, (r) => r);
  }
  getAccessoriesData() async {
    var response = await crud.getData(AppLink.accessories);
    return response.fold((l) => l, (r) => r);
  }
}