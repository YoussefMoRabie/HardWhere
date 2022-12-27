class Prodect {
  int? pid;
  HasOffer? hasOffer;
  String? imgLink;
  int? newPrice;
  String? productName;
  int? price;
  String? color;
  int? count;
  String? suName;
  String? pValue;
  String? desc;
  int? favorite;

  Prodect(
      {this.pid,
        this.hasOffer,
        this.imgLink,
        this.newPrice,
        this.productName,
        this.price,
        this.color,
        this.count,
        this.suName,
        this.pValue,
        this.desc,
        this.favorite});

  Prodect.fromJson(Map<String, dynamic> json) {
    pid = json['pid'];
    hasOffer = json['has_offer'] != null
        ? new HasOffer.fromJson(json['has_offer'])
        : null;
    imgLink = json['img_link'];
    newPrice = json['new_price'];
    productName = json['product_name'];
    price = json['price'];
    color = json['color'];
    count = json['count'];
    suName = json['su_name'];
    pValue = json['p_value'];
    desc = json['desc'];
    favorite = json['favorite'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['pid'] = this.pid;
    if (this.hasOffer != null) {
      data['has_offer'] = this.hasOffer!.toJson();
    }
    data['img_link'] = this.imgLink;
    data['new_price'] = this.newPrice;
    data['product_name'] = this.productName;
    data['price'] = this.price;
    data['color'] = this.color;
    data['count'] = this.count;
    data['su_name'] = this.suName;
    data['p_value'] = this.pValue;
    data['desc'] = this.desc;
    data['favorite'] = this.favorite;
    return data;
  }
}

class HasOffer {
  String? type;
  List<int>? data;

  HasOffer({this.type, this.data});

  HasOffer.fromJson(Map<String, dynamic> json) {
    type = json['type'];
    data = json['data'].cast<int>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['type'] = this.type;
    data['data'] = this.data;
    return data;
  }
}
