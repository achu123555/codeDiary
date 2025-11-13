package com.achu.sys.mapper;

import com.achu.sys.pojo.Dept;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DeptMapper {
    /**
     * 1.4 查询所有部门信息
     * @return
     */
    @Select("select * from dept order by id")
    List<Dept> getList();

    /**
     * 2.4 根据id删除部门信息
     * @param id
     */
    @Delete("delete from dept where id = #{id}")
    void deleteDept(Integer id);

    /**
     * 3.4 插入部门信息
     * @param dept
     */
    @Insert("insert into dept(name,create_time,update_time) values (#{name},#{createTime},#{updateTime})")
    void addDept(Dept dept);

    /**
     * 4.4 根据id查询所有信息回显
     * @param id
     * @return
     */
    @Select("select * from dept where id = #{id}")
    Dept getById(Integer id);

    /**
     * 5.4 根据id修改部门信息
     * @param dept
     */
    @Update("update dept set name=#{name},update_time=#{updateTime} where id=#{id}")
    void updateDept(Dept dept);
}
