package com.achu.sys.controller;


import com.achu.sys.pojo.Dept;
import com.achu.sys.pojo.Response;
import com.achu.sys.service.DeptService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//允许跨域访问
@CrossOrigin(origins = {"http://127.0.0.1:8080"})
//公共路径 方法抽取
@RequestMapping("/depts")
//日志
@Slf4j
public class DeptController {
    @Autowired
    //@Qualifier("实现类名")  可筛选实现类
    private DeptService deptService;

    /**
     * 1.1 查询所有部门信息(GET) Path : /depts
     * 调用路径: controller(3.接收) -> service(2.递归) -> mapper(1.返回Dept类型集合)
     * @return
     */
    @GetMapping
    public Response deptList(){
        List<Dept> deptList = deptService.getList();
        return Response.success(deptList);
    }

    /**
     * 2.1 根据id删除部门(DELETE)  Path : /depts?id=1
     * --接收请求参数方式一 : HttpServletRequest.getParameter()
     * --接收请求参数方式二 : 加@RequestParam注解在方法形参前
     * ----将前端传的id参数绑定到方法形参上,通过value属性执行绑定的参数名称
     * ----通过required属性指定该参数是否必须(默认必须)  required=false->没传id时不报错
     * --接收请求参数方式三 : 直接定义参数接收,但是需要保证前端传递过来的参数名称和方法形参一致
     * @param
     * @return
     */
    @DeleteMapping("/{id}")
    public Response deleteDept(@PathVariable("id") Integer id){
        log.info("删除部门ID:{}", id);
        deptService.deleteDept(id);
        return Response.success();
    }

    /**
     * 3.1 新增部门(POST)
     * --接收请求参数 : 通常使用实体类来接收JSON数据
     * ----注意1 : 添加@RequestBody注解来修饰实体类实例变量
     * ----注意2 : 保证json格式的键名和对象属性名保持一致,否则映射不成功
     *
     * @param dept
     * @return
     */
    @PostMapping
    public Response addDept(@RequestBody Dept dept){
        try {
            log.info("添加部门数据:{}",dept);
            deptService.addDept(dept);
            return Response.success();
        } catch (Exception e) {
            log.error("添加部门数据异常:{}",e.getMessage(), e);
            // 返回错误响应而不是抛出异常
            return Response.error("添加部门失败: " + e.getMessage());
        }
    }

    /**
     *  4.1 根据id查询信息 信息回显  Path : /depts/1
     * @return
     */
    @GetMapping("/{id}")
    public Response getById(@PathVariable("id") Integer id){
        log.info("根据ID查询信息:{}",id);
        Dept dept = deptService.getById(id);
        return Response.success(dept);
    }

    @PutMapping("/{id}")
    public Response updateDept(@PathVariable("id") Integer id, @RequestBody Dept dept){
        try {
            // 确保dept对象包含正确的id
            dept.setId(id);
            log.info("修改部门数据:{}", dept);
            this.deptService.updateDept(dept);
            return Response.success();
        } catch (Exception e) {
            log.error("修改部门数据异常:{}", e.getMessage(), e);
            return Response.error("修改部门失败: " + e.getMessage());
        }
    }

}
