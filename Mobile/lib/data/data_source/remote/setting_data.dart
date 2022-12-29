import 'package:hardwhere/main.dart';

import '../../../../API.dart';
import '../../../../core/class/curd.dart';

class SettingData {
  Crud crud;
  SettingData(this.crud);
  updateData( password , email , phone, address) async {
    var response = await crud.patchData("${AppLink.updateUser}$id",{

        "phone":"$phone",
        "address":"$password",
        "email":"$email",
        "password":"$password"
    });
    return response.fold((l) => l, (r) => r);
  }
}