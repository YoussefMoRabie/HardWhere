import 'package:flutter/material.dart';

class AuthTextField extends StatelessWidget {
  final String labelText;
  final String hintText;
  final IconData  sufIcon;
  const AuthTextField({Key? key,required this.labelText,required this.sufIcon, required this.hintText}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
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
