package com.example.demo;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadServlet extends HttpServlet {

    private static final String UPLOAD_DIRECTORY = "D:\\upload";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (!ServletFileUpload.isMultipartContent(request)) {
            PrintWriter writer = response.getWriter();
            writer.println("Error: Form must has enctype=multipart/form-data.");
            writer.flush();
            return;
        }

        ServletFileUpload upload = new ServletFileUpload();

        FileItemIterator iter;
        try {
            iter = upload.getItemIterator(request);

            while (iter.hasNext()) {
                FileItemStream item = iter.next();
                String name = item.getFieldName();
                if (item.isFormField()) {
                    System.out.println("Form field " + name + " detected.");
                } else {
                    System.out.println("File field " + name + " with file name "
                            + item.getName() + " detected.");
                    try(InputStream stream = item.openStream()){
                        Files.copy(stream, Paths.get(UPLOAD_DIRECTORY, item.getName()), StandardCopyOption.REPLACE_EXISTING);
                    }
                }
            }
        } catch (FileUploadException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/plain");
        resp.getWriter().append("Hallo vom Upload Servlet");
    }

}
