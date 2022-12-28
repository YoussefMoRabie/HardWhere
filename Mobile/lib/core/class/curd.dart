import 'dart:convert';

import 'package:hardwhere/core/class/status_request.dart';
import 'package:dartz/dartz.dart';
import '../functions/check_internet.dart';
import 'package:http/http.dart' as http;

class Crud {
  Future<Either<StatusRequest, Map>> postData(String linkUrl, Map data) async {
    print(linkUrl);
    print(data);
    try {
      if (await checkInternet()) {
        var response = await http.post(Uri.parse(linkUrl), body: data);
        if (response.statusCode == 200 || response.statusCode == 201) {
          print(response.body);
          Map responseBody = jsonDecode(response.body);
          return Right(responseBody);
        } else {
          print("statusCode == 404");
          return const Left(StatusRequest.serverFailure);
        }
      } else {
        return const Left(StatusRequest.offlineFailure);
      }
    } catch (_) {
      return const Left(StatusRequest.serverFailure);
    }
  }
  Future<Either<StatusRequest, Map>> patchData(String linkUrl, Map data) async {
    print(linkUrl);
    print(data);
    try {
      if (await checkInternet()) {
        var response = await http.patch(Uri.parse(linkUrl), body: data);
        if (response.statusCode == 200 || response.statusCode == 201) {
          print(response.body);
          Map responseBody = jsonDecode(response.body);
          return Right(responseBody);
        } else {
          print("statusCode == 404");
          return const Left(StatusRequest.serverFailure);
        }
      } else {
        return const Left(StatusRequest.offlineFailure);
      }
    } catch (_) {
      return const Left(StatusRequest.serverFailure);
    }
  }
  Future<Either<StatusRequest, Map>> getData(String linkUrl) async {
    try {
      if (await checkInternet()) {
        var response = await http.get(Uri.parse(linkUrl));
        if (response.statusCode == 200 || response.statusCode == 201) {
          Map responseBody = jsonDecode(response.body);
          print(responseBody);
          return Right(responseBody);
        } else {
          print("statusCode == 404");
          return const Left(StatusRequest.serverFailure);
        }
      } else {
        return const Left(StatusRequest.offlineFailure);
      }
    } catch (_) {
      return const Left(StatusRequest.offlineFailure);
    }
  }
  Future<Either<StatusRequest, Map>> deleteData(String linkUrl) async {
    try {
      if (await checkInternet()) {
        var response = await http.delete(Uri.parse(linkUrl));
        print(linkUrl);
        print(response.body);
        print(response.statusCode);
        if (response.statusCode == 200 || response.statusCode == 201) {
          Map responseBody = jsonDecode(response.body);
          print(responseBody);
          return Right(responseBody);
        } else {
          print("statusCode == 404");
          return const Left(StatusRequest.serverFailure);
        }
      } else {
        return const Left(StatusRequest.offlineFailure);
      }
    } catch (_) {
      return const Left(StatusRequest.offlineFailure);
    }
  }

}