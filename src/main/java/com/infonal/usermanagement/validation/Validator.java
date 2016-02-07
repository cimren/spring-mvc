/*
 * Author: Cihan Ýmren
 * Date: 07.02.2016
 * 
 */
package com.infonal.usermanagement.validation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import nl.captcha.Captcha;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
   
@Controller    
public class Validator {  
   		    
    @RequestMapping(value = "validate/{answer}", method = RequestMethod.GET )
    @ResponseBody
    public boolean validateCaptcha(@PathVariable String answer, HttpServletRequest request, HttpSession httpSession) {    			    	
    	//get captcha object from the session
    	Captcha captcha = (Captcha) httpSession.getAttribute(Captcha.NAME);
    	//check if the provided answer matches with the captcha
        if (!captcha.isCorrect(answer)){
        	return false;
        }
        return true;
    }   
            
}
