package com.achu.sys.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//后端统一返回结果

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private Integer code; //状态码
    private String msg;   //信息
    private Object data; //响应的数据

    public static Response success() {
        Response response = new Response();
        response.code = 1;
        response.msg = "success";
        return response;
    }

    public static Response success(Object object) {
        Response response = success();
        response.data = object;
        return response;
    }

    public static Response error(String errMsg) {
        Response response = new Response();
        response.code = 0;
        response.msg = errMsg;
        return response;
    }
}