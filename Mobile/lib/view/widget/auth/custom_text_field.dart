import 'package:flutter/material.dart';

class AuthTextField extends StatelessWidget {
  final String labelText;
  final String hintText;
  final IconData  sufIcon;
  final String? Function(String?) valid;
  final bool ? hide;
  const AuthTextField({Key? key,this.hide,required this.labelText,required this.sufIcon, required this.hintText,required this.valid}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      validator: valid,
      obscureText: (hide==null||hide==false)? false:true ,
      decoration:  InputDecoration(
        hintText: hintText,
        hintStyle: const TextStyle(fontSize: 12),
        contentPadding: const EdgeInsets.symmetric(horizontal: 25,vertical:15 ),
        suffixIcon: Icon(sufIcon),
        label:  Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15),
          child: Text(labelText),
        ),

        floatingLabelBehavior: FloatingLabelBehavior.always,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(25),
        ),
      ),
    );
  }
}
