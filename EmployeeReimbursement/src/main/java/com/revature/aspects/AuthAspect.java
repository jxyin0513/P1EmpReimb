package com.revature.aspects;

import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AuthAspect {

    @Order(1)
    @Before("within(com.revature.controllers.*)" +
            "&& !execution(* com.revature.controllers.UserController.logInUser(..))" +
            "&& !execution(* com.revature.controllers.UserController.addUser(..))")
    public void checkLoggedIn(){
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);

        if (session == null || session.getAttribute("userId") == null) {
            throw new IllegalArgumentException("User is not logged in");
        }
    }

    @Order(2)
    @Before("@annotation(AdminOnly)")
    public void checkAdmin(){
       System.out.println("Check role");

       System.out.println(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
               .getRequest().getSession().getAttribute("role"));
        //If the logged in User's role != "manager" throw an exception
        if(!"manager".equals(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getSession().getAttribute("role"))){

            throw new IllegalArgumentException("User is not a manager!");

        }

    }
}
