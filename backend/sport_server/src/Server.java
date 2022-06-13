import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Server {
    //сервер
    private HttpServer _server = null;

    //переменные для базы данных
    /*private HttpServer server = null;
    private static final String db_addr = "jdbc:mysql://localhost:3306";
    private static final String db_user = "root";
    private static final String db_password = "qwerty123";*/

    //создание сервера
    public Server () throws IOException {
        _server = HttpServer.create(new InetSocketAddress("localhost", 8001), 0);

        //_server.createContext();

        _server.setExecutor(null);

    }

    //запуск сервера
    public void start() {
        _server.start();
    }

    //хендлер для принятия запросов на сервер
    abstract static class MyHTTPHandler implements HttpHandler {

        public abstract int htmlHandler(String request, StringBuilder answer, String request_url);

        public void handle (HttpExchange t) throws IOException {
            String reguest_url = t.getRequestURI().toString();
            System.out.println("Reguest URL : " + reguest_url);
            String requestMethod = t.getRequestMethod();
            InputStream is; //используем для чтения данных запроса
            String requestString = "";
            if (requestMethod.equalsIgnoreCase("POST")) {
                try {
                    StringBuilder requestBuffer = new StringBuilder();
                    is = t.getRequestBody();
                    int rByte;
                    while ((rByte = is.read()) != -1) {
                        requestBuffer.append((char) rByte);
                    }
                    is.close();
                    if (requestBuffer.length() > 0) {
                        requestString = URLDecoder.decode(requestBuffer.toString(), "UTF-8");
                    } else {
                        requestString = null;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            String response = "Error";
            StringBuilder answer = new StringBuilder();
            htmlHandler(requestString, answer, reguest_url);
            response = answer.toString();

            ByteBuffer buffer = Charset.forName("UTF-8").encode(response);
            byte[] bytes = new byte[buffer.remaining()];
            buffer.get(bytes);

            t.sendResponseHeaders(200, bytes.length);
            OutputStream os = t.getResponseBody();
            try {
                os.write(bytes);
            }catch(Exception e) {System.out.println(e.getMessage());}
            os.close();
        }
    }

}