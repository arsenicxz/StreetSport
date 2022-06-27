import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.sql.Time;
import java.time.LocalDate;

public class Server {
    //сервер
    private HttpServer _server = null;

    //создание сервера
    public Server () throws IOException {
        _server = HttpServer.create(new InetSocketAddress("localhost", 8001), 0);
        System.out.println("server started at port 8001 (localhost)");

        _server.createContext("/", new MyHttpHandler() {
            @Override
            public int HandleHtml(String request, StringBuilder answer, String request_url) {
                return 0;
            }
        });

        _server.createContext("/login", new LoginHandler()); //вход
        _server.createContext("/reg", new NewUserHandler()); //регистрация
        _server.createContext("/showme", new ShowProfileUserHandler()); //показать профиль пользователя
        _server.createContext("/delete", new DeleteUserHandler()); //удаление профиля
        _server.createContext("/edit", new EditUserHandler()); //редактирование профиля
        _server.createContext("/showusergames", new ShowUserGamesHandler()); //показать игры в профиле
        _server.createContext("/editusergames", new EditUserGamesHandler()); //редактировать игры в профиле
        _server.createContext("/searchgames", new SearchGamesHandler()); //поиск игры
        _server.createContext("/showalltypes", new ShowAllTypes()); //показать все виды игр
        _server.createContext("/play", new PlayGameHandler()); //записаться на игру
        _server.createContext("/creategame", new CreateGameHandler()); //создать игру
        _server.createContext("/gameending", new EndingGameHandler()); //окончание игры
        _server.createContext("/showmycreatedgames", new ShowCreateGamesHandler()); //показать, созданные пользователем игры

        _server.setExecutor(null);
    }

    //запуск сервера
    public void start() {
        _server.start();
    }

    //хендлер для принятия запросов на сервер
    abstract static class MyHttpHandler implements HttpHandler {

        public abstract int HandleHtml(String request, StringBuilder answer, String request_url);

        public void handle (HttpExchange t) throws IOException {
            String reguest_url = t.getRequestURI().toString();
            System.out.println("Reguest URL : " + reguest_url);
            String requestMethod = t.getRequestMethod();
            InputStream is;
            String requestObj = "";
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
                        requestObj = URLDecoder.decode(requestBuffer.toString(), "UTF-8");
                    } else {
                        requestObj = null;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            String response = "Error";
            StringBuilder answer = new StringBuilder();
            HandleHtml(requestObj, answer, reguest_url);
            response = answer.toString();

            ByteBuffer buffer = Charset.forName("UTF-8").encode(response);
            byte[] bytes = new byte[buffer.remaining()];
            buffer.get(bytes);

            t.sendResponseHeaders(200, bytes.length);
            OutputStream os = t.getResponseBody();
            try {
                os.write(bytes);
            } catch(Exception e) {
                System.out.println(e.getMessage());
            }
            os.close();
        }
    }

    //авторизация пользователя
    public static class LoginHandler extends MyHttpHandler {
        private DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            //String s = "mod=CheckUserAuth&login=krosh&password=qwerty";
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("requestID", "0");
            answer.put("answer", "server error kapez");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("CheckUserAuth")) {
                    String login = (String) req.get("login");
                    String password = (String) req.get("password");
                    System.out.println("user: " + login + " " + password);
                    String resultDataBase =_dataBase.CheckUserAuth(login, password);
                    if ( resultDataBase != ("-1")) {
                        answer.put("requestID", "1");
                        answer.put("answer", resultDataBase);
                        result = answer.toJSONString();
                        //return result;
                    } else {
                        answer.put("requestID", "0");
                        answer.put("answer", "error pipez");
                        result = answer.toJSONString();
                        //return result;
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //регистрация пользователя
    public static class NewUserHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("NewUserReg")) {
                    String username = (String) req.get("username");
                    String telephone = (String) req.get("telephone");
                    String mail = (String) req.get("mail");
                    String password = (String) req.get("password");
                    System.out.println("user: " + username + " " + telephone + " " + mail + " " + password);

                    if (_dataBase.NewUser(username, telephone, mail, password)) {
                        answer.put("answer", "you sign in");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //удаление пользователя
    public static class DeleteUserHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();

            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("DeleteUser")) {
                    int id = (int) req.get("id");
                    System.out.println("user with id: " + id);

                    if (_dataBase.DeleteUser(id)) {
                        answer.put("answer", "this user deleted");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //редактирование профиля
    public static class EditUserHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();

            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("EditUser")) {
                    int id = (int) req.get("id");
                    String username = (String) req.get("username");
                    String telephone = (String) req.get("telephone");
                    String mail = (String) req.get("mail");
                    String password = (String) req.get("password");
                    System.out.println("user with id: " + id + " " + username
                            + " " + telephone + " " + mail + " " + password);

                    if (_dataBase.EditUser(id, username, telephone, mail, password)) {
                        answer.put("answer", "your profile was edited");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //показать виды спорта пользователя
    public static class ShowUserGamesHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("ShowUserGames")) {
                    String id = (String) req.get("userid");
                    int userid = Integer.parseInt(id);

                    if (_dataBase.ShowUserGames(userid)) {
                        answer.put("answer", "user games were shown");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //редактирование видов спорта пользователя
    public static class EditUserGamesHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("EditUserGames")) {
                    String id = (String) req.get("userid");
                    int userid = Integer.parseInt(id);
                    String gameid = (String) req.get("gametypeid");
                    int gametypeid = Integer.parseInt(gameid);

                    if (_dataBase.EditUserGames(userid, gametypeid)) {
                        answer.put("answer", "user games were edited");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //поиск игры
    public static class SearchGamesHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            System.out.println(request);
            JSONObject answer = new JSONObject();
            answer.put("requestID", "0");
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("SearchGames")) {
                    JSONArray game = (JSONArray) req.get("gametypeid");
                    if(game.size() < 1){
                        answer.put("requestID", "0");
                        answer.put("answer", "empty request");
                        return answer.toJSONString();
                    }
                    for(int i = 0; i < game.size(); i++){
                        System.out.println(game.get(i));
                    }

                    StringBuilder gameTypeString = new StringBuilder();
                    for(int i = 0; i < game.size(); i++){
                        if(i+1 != game.size()){
                            gameTypeString.append(game.get(i)).append(" , ");
                        }else{
                            gameTypeString.append(game.get(i));
                        }
                    }
                    System.out.println(gameTypeString.toString());
                    String dt = (String) req.get("date");
                    LocalDate date = LocalDate.parse(dt);
                    String resultDataBase =_dataBase.SearchGames(gameTypeString.toString(), date);
                    if (resultDataBase!="-1") {
                        answer.put("answer", "games");
                        result = resultDataBase;
                    } else {
                        answer.put("requestID", "0");
                        answer.put("answer", "null games");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //отображение всего списка видов спорта
    public static class ShowAllTypes extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("ShowAllTypes")) {
                    String resultDataBase =_dataBase.ShowAllTypes();
                    if (resultDataBase!="-1") {
                        answer.put("answer", "games");
                        result = resultDataBase;
                    } else {
                        answer.put("answer", "null games");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //отображение профиля пользователя
    public static class ShowProfileUserHandler extends MyHttpHandler {
        private DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("requestID", "0");
            answer.put("answer", "server error kapez");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("ShowMyProfile")) {
                    String userID = (String) req.get("myID");
                    System.out.println("userID: " + userID );
                    String resultDataBase =_dataBase.ShowUserProfile(userID);
                    if ( resultDataBase != ("-1")) {
                        answer.put("answer", resultDataBase);
                        result = resultDataBase;
                    } else {
                        answer.put("answer", "error pipez");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //записаться на игру
    public static class PlayGameHandler extends MyHttpHandler {
        private DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error kapez");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("UserWantToPlay")) {
                    String id = (String) req.get("couchingid");
                    int couchingid = Integer.parseInt(id);
                    System.out.println("couchingid: " + couchingid);
                    if (_dataBase.CountUsersOnGame(couchingid)) {
                        answer.put("answer", "you're in game!");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error pipez");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //создать игру
    public static class CreateGameHandler extends MyHttpHandler {
        private DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error kapez");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("CreateGame")) {
                    String gameid = (String) req.get("gametypeid");
                    int gametypeid = Integer.parseInt(gameid);

                    String tid = (String) req.get("tournamentid");
                    int tournamentid = Integer.parseInt(tid);

                    String dat = (String) req.get("date");
                    LocalDate date = LocalDate.parse(dat);

                    String tim = (String) req.get("time");
                    Time time = Time.valueOf(tim);

                    String rat = (String) req.get("rating");
                    int rating = Integer.parseInt(rat);

                    String creator = (String) req.get("creatorcouching");
                    ByteBuffer byteBuffer1 = StandardCharsets.ISO_8859_1.encode(creator);
                    String crutf8 = new String(byteBuffer1.array(), StandardCharsets.UTF_8);

                    String address = (String) req.get("address");
                    ByteBuffer byteBuffer2 = StandardCharsets.ISO_8859_1.encode(address);
                    String adrutf8 = new String(byteBuffer2.array(), StandardCharsets.UTF_8);
                    System.out.println(adrutf8);
                    String latit = (String) req.get("latitude");
                    double latitude = Double.parseDouble(latit);

                    String longit = (String) req.get("longitude");
                    double longitude = Double.parseDouble(longit);

                    String coun = (String) req.get("count");
                    int count = Integer.parseInt(coun);

                    String usrat = (String) req.get("userrating");
                    double userrating = Double.parseDouble(usrat);

                    if (_dataBase.Couching(gametypeid, tournamentid, date, time,
                            rating, crutf8, adrutf8, latitude, longitude, count, userrating )) {
                        answer.put("answer", "game was created!");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error pipez");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //окончание игры
    public static class EndingGameHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("EndingGame")) {
                    String id = (String) req.get("couchingid");
                    int couchingid = Integer.parseInt(id);
                    String play = (String) req.get("played");
                    int played = Integer.parseInt(play);
                    String creator = (String) req.get("creator");

                    if (_dataBase.GameEnding(couchingid, played, creator)) {
                        answer.put("answer", "game was ended");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "null games");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //показать, созданные пользователем игры
    public static class ShowCreateGamesHandler extends MyHttpHandler {
        private DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error kapez");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("ShowMyCreatedGames")) {
                    String creatorcouching = (String) req.get("creatorcouching");
                    System.out.println("creatorcouching: " + creatorcouching);
                    String resultDataBase =_dataBase.ShowCreateGames(creatorcouching);
                    if ( resultDataBase != ("-1")) {
                        answer.put("answer", resultDataBase);
                        result = resultDataBase;
                    } else {
                        answer.put("answer", "error pipez");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }
}