package com.nvm.project1.utils;

public class test {
    public static void main(String[] args) {
        String name="NV12";
        String cc= name.substring(0,2);
        String cc1=name.substring(2);
        String newString=cc+( Integer.parseInt(cc1) +1);
        System.out.println(newString);
    }
}
