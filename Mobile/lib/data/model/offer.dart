class Offer {
  int? pid;
  String? productName;
  String? imgLink;
  int? price;
  int? newPrice;
  String? startDate;
  String? endDate;
  String? desc;
  String? pValue;
  int? count;

  Offer(
      {this.pid,
        this.productName,
        this.imgLink,
        this.price,
        this.newPrice,
        this.startDate,
        this.endDate,
        this.desc,
        this.pValue,
        this.count});

  Offer.fromJson(Map<String, dynamic> json) {
    pid = json['pid'];
    productName = json['product_name'];
    imgLink = json['img_link'];
    price = json['price'];
    newPrice = json['new_price'];
    startDate = json['start_date'];
    endDate = json['end_date'];
    desc = json['desc'];
    pValue = json['p_value'];
    count = json['count'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['pid'] = pid;
    data['product_name'] = productName;
    data['img_link'] = imgLink;
    data['price'] = price;
    data['new_price'] = newPrice;
    data['start_date'] = startDate;
    data['end_date'] = endDate;
    data['desc'] = desc;
    data['p_value'] = pValue;
    data['count'] = count;
    return data;
  }
}
