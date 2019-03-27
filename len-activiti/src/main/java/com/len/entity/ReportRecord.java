package com.len.entity;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "report_record")
public class ReportRecord implements Serializable {
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    @Column(name = "user_id")
    private String userId;

    private String username;

    @Column(name = "event_car_no")
    private String eventCarNo;

    @Column(name = "event_car_no_type")
    private String eventCarNoType;

    @Column(name = "event_car_no_color")
    private String eventCarNoColor;

    @Column(name = "event_car_color")
    private String eventCarColor;

    @Column(name = "event_car_type")
    private String eventCarType;

    @Column(name = "event_road")
    private String eventRoad;

    @Column(name = "event_car_dir")
    private String eventCarDir;

    @Column(name = "event_run_km")
    private String eventRunKm;

    @Column(name = "event_run_m")
    private String eventRunM;

    @Column(name = "event_time")
    private String eventTime;

    @Column(name = "car_event")
    private String carEvent;

    private String filestr;

    @Column(name = "event_description")
    private String eventDescription;

    @Column(name = "task_name")
    private String taskName ;

    @Column(name = "process_instance_id")
    private  String processInstanceId ;


    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return user_id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @param userId
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username
     */
    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    /**
     * @return event_car_no
     */
    public String getEventCarNo() {
        return eventCarNo;
    }

    /**
     * @param eventCarNo
     */
    public void setEventCarNo(String eventCarNo) {
        this.eventCarNo = eventCarNo == null ? null : eventCarNo.trim();
    }

    /**
     * @return event_car_no_type
     */
    public String getEventCarNoType() {
        return eventCarNoType;
    }

    /**
     * @param eventCarNoType
     */
    public void setEventCarNoType(String eventCarNoType) {
        this.eventCarNoType = eventCarNoType == null ? null : eventCarNoType.trim();
    }

    /**
     * @return event_car_no_color
     */
    public String getEventCarNoColor() {
        return eventCarNoColor;
    }

    /**
     * @param eventCarNoColor
     */
    public void setEventCarNoColor(String eventCarNoColor) {
        this.eventCarNoColor = eventCarNoColor == null ? null : eventCarNoColor.trim();
    }

    /**
     * @return event_car_color
     */
    public String getEventCarColor() {
        return eventCarColor;
    }

    /**
     * @param eventCarColor
     */
    public void setEventCarColor(String eventCarColor) {
        this.eventCarColor = eventCarColor == null ? null : eventCarColor.trim();
    }

    /**
     * @return event_car_type
     */
    public String getEventCarType() {
        return eventCarType;
    }

    /**
     * @param eventCarType
     */
    public void setEventCarType(String eventCarType) {
        this.eventCarType = eventCarType == null ? null : eventCarType.trim();
    }

    /**
     * @return event_road
     */
    public String getEventRoad() {
        return eventRoad;
    }

    /**
     * @param eventRoad
     */
    public void setEventRoad(String eventRoad) {
        this.eventRoad = eventRoad == null ? null : eventRoad.trim();
    }

    /**
     * @return event_car_dir
     */
    public String getEventCarDir() {
        return eventCarDir;
    }

    /**
     * @param eventCarDir
     */
    public void setEventCarDir(String eventCarDir) {
        this.eventCarDir = eventCarDir == null ? null : eventCarDir.trim();
    }

    /**
     * @return event_run_km
     */
    public String getEventRunKm() {
        return eventRunKm;
    }

    /**
     * @param eventRunKm
     */
    public void setEventRunKm(String eventRunKm) {
        this.eventRunKm = eventRunKm == null ? null : eventRunKm.trim();
    }

    /**
     * @return event_run_m
     */
    public String getEventRunM() {
        return eventRunM;
    }

    /**
     * @param eventRunM
     */
    public void setEventRunM(String eventRunM) {
        this.eventRunM = eventRunM == null ? null : eventRunM.trim();
    }

    /**
     * @return event_time
     */
    public String getEventTime() {
        return eventTime;
    }

    /**
     * @param eventTime
     */
    public void setEventTime(String eventTime) {
        this.eventTime = eventTime == null ? null : eventTime.trim();
    }

    /**
     * @return car_event
     */
    public String getCarEvent() {
        return carEvent;
    }

    /**
     * @param carEvent
     */
    public void setCarEvent(String carEvent) {
        this.carEvent = carEvent == null ? null : carEvent.trim();
    }

    /**
     * @return filestr
     */
    public String getFilestr() {
        return filestr;
    }

    /**
     * @param filestr
     */
    public void setFilestr(String filestr) {
        this.filestr = filestr == null ? null : filestr.trim();
    }

    /**
     * @return event_description
     */
    public String getEventDescription() {
        return eventDescription;
    }

    /**
     * @param eventDescription
     */
    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription == null ? null : eventDescription.trim();
    }

    /**
     * @return TaskName
     */
    public String getTaskName() {
        return taskName;
    }

    /**
     * @param taskName
     */
    public void setTaskName(String taskName) {
        this.taskName = taskName == null ? null : taskName.trim();
    }

    /**
     * @return processInstanceId
     */
    public String getProcessInstanceId() {
        return processInstanceId;
    }

    /**
     * @param processInstanceId
     */
    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId == null ? null : processInstanceId.trim();
    }




}