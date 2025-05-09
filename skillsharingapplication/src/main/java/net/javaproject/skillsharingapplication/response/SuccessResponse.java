package net.javaproject.skillsharingapplication.response;

public class SuccessResponse {
    private String message;
    private Object data; // You can also send the data if needed

    public SuccessResponse(String message) {
        this.message = message;
    }

    public SuccessResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
