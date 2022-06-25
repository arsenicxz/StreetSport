import jdk.javadoc.doclet.Taglet;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.awt.*;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.*;
import java.time.LocalDate;
import java.util.Properties;

public class DataBase {
    Connection dbConnection;

    public DataBase() throws SQLException, IOException {
        String[] connParams = {"", "", ""};
        getConnectionParameters(connParams);
        dbConnection = DriverManager.getConnection(connParams[0], connParams[1], connParams[2]);
    }

    public void getConnectionParameters(String[] connParams) throws IOException {
        Properties props = new Properties();
        try(InputStream in = Files.newInputStream(Paths.get("database.properties"))) {
            props.load(in);
        }
        connParams[0] = props.getProperty("url");
        connParams[1] = props.getProperty("username");
        connParams[2] = props.getProperty("password");
    }

    //проверка авторизованности пользователя
    public String CheckUserAuth (String login, String password) {
        if (login.contains("@")) {
            String query = "SELECT userid, mail, password FROM user " +
                    "WHERE mail = '" + login + "' AND password = '" + password + "'";
            try {
                PreparedStatement prSt = dbConnection.prepareStatement(query);
                ResultSet result =  prSt.executeQuery();
                if(result.next()) {
                    String id = result.getString(1);
                    System.out.println(id);
                    return id;
                }
                return "-1";
            }
            catch (SQLException e) {
                e.printStackTrace();
                return "-1";
            }
        } else {
            String query = "SELECT userid, telephone, password FROM user " +
                    "WHERE telephone = '" + login + "' AND password = '" + password + "'";
            try {
                PreparedStatement prSt = dbConnection.prepareStatement(query);
                ResultSet result =  prSt.executeQuery();
                if(result.next()) {
                    String id = result.getString(1);
                    System.out.println(id);
                    return id;
                }
                return "-1";
            }
            catch (SQLException e) {
                e.printStackTrace();
                return "-1";
            }
        }
    }

    //добавление/создание профиля пользователя
    public boolean NewUser(String username,
                          String telephone,
                          String mail,
                          String password) {
        try {
            String query = "INSERT INTO user (username, telephone, mail, password) " +
                    "VALUES (?,?,?,?)";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setString(1, username);
            prSt.setString(2, telephone);
            prSt.setString(3, mail);
            prSt.setString(4, password);
            return true;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //редактирование профиля пользователя
    public boolean EditUser (int userid,
                            String username,
                            String telephone,
                            String mail,
                            String password) {
        try {
            String query = "UPDATE user SET username = ?, telephone = ?, " +
                    "mail = ?, password = ? WHERE id = ?";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setString(1, username);
            prSt.setString(2, telephone);
            prSt.setString(3, mail);
            prSt.setString(4, password);
            return true;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //удалить профиль пользователя
    public boolean DeleteUser (int userid) {
        String query = "DELETE FROM user WHERE id = ?";
        try {
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setInt(1, userid);
            prSt.execute();
            return true;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //выбор интересующих игр
    //страничка - мои игры
    public boolean EditUserGames (int userid, int gametypeid) {
        try {
            String query = "INSERT INTO usergamelike " +
                    "(userid, gametypeid) VALUES (?,?) ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setInt(1, userid);
            prSt.setInt(2, gametypeid);
            return true;
        }
         catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //показать виды спорта пользователя
    public boolean ShowUserGames (int userid) {
        try {
            String query = "SELECT gametypeid FROM usergamelike " +
                    "WHERE userid = ? ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setInt(1, userid);
            return true;
        } catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //создание игры
    public boolean Couching (int couchingid, int gametypeid,
                            int tournamentid, LocalDate date,
                            Time time, int played,
                            int rating, Time duration,
                            int achievment, String creatorcouching,
                            double latitude, double longitude) {

        try {
            String query = "INSERT INTO couching " +
                    "(couchingid, gametypeid, tournamentid, date, time, " +
                    "played, rating, duration, achievment, creatorcouching, latitude, longitude) " +
                    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setInt(1, couchingid);
            prSt.setInt(2, gametypeid);
            prSt.setInt(3, tournamentid);
            prSt.setDate(4, Date.valueOf(date));
            prSt.setTime(5, time);
            prSt.setInt(6, played);//??? - по факту это ставится по итогу игры
            prSt.setInt(7, rating);
            prSt.setTime(8, duration);
            prSt.setInt(9, achievment);
            prSt.setString(10, creatorcouching);
            prSt.setDouble(11, latitude);
            prSt.setDouble(12, longitude);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //рейтинг по итогу игры
    public boolean GameEnding (int couchingid, int played, int achievment) {
        try {
            String query = "INSERT INTO couching " +
                    "(played, achievment) VALUES (?,?) WHERE couchingid = ? ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setInt(1, played);
            prSt.setInt(2, achievment);
            return  true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //поиск игр
    public String SearchGames (int gametypeid, LocalDate date) {
        String query = "SELECT * FROM couching " +
                "WHERE gametypeid = '" + gametypeid + "' AND date = '" + date + "'";
        try {
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            JSONArray list = new JSONArray();

            while(result.next()) {
                String couchingid = result.getString(1);
                System.out.println(couchingid);
                String tournametid = result.getString(3);
                System.out.println(tournametid);
                String time = result.getString(5);
                System.out.println(time);
                String duration = result.getString(8);
                System.out.println(duration);
                String latitude = result.getString(11);
                System.out.println(latitude);
                String longitude = result.getString(12);
                System.out.println(longitude);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("couchingid", couchingid);
                resultJSON.put("tournametid", tournametid);
                resultJSON.put("time", time);
                resultJSON.put("duration", duration);
                resultJSON.put("latitude", latitude);
                resultJSON.put("longitude", longitude);
                list.add(resultJSON);
            }
                return list.toJSONString();
        } catch(SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //показать весь список видов спорта
    public String ShowAllTypes () {
        try {
            String query = "SELECT * FROM gametype";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            JSONArray list = new JSONArray();

            while (result.next()) {
                String gametypeid = result.getString(1);
                System.out.println(gametypeid);
                String gametypename = result.getString(2);
                System.out.println(gametypename);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("gametypeid", gametypeid);
                resultJSON.put("gametypename", gametypename);
                list.add(resultJSON);
            }
            return list.toJSONString();
        } catch(SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }
}
