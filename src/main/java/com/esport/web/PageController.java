package com.esport.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

  @GetMapping("/")
  public String indexCs() {
    return "index";
  }

  @GetMapping("/en")
  public String indexEn() {
    return "index-en";
  }
}