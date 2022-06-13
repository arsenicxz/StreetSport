import java.awt.*;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
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
    public String CheckUserAuth(int check, String mail, long telephone, String password) {
        /*String query = "SELECT username, password" +
                "FROM user " +
                "WHERE username = '" + username + "' AND password = '" + password + "'";

                check = 1 - telephone;
                check = 2 - mail
         */
        switch (check) {
            case 1:
                String query1 = "SELECT telephone, password" +
                        "FROM user " +
                        "WHERE telephone = '" + telephone + "' AND password = '" + password + "'";
                try {
                    PreparedStatement prSt = dbConnection.prepareStatement(query1);
                    ResultSet result =  prSt.executeQuery();
                    if(result.next()) {
                        return "Success\n";
                    }
                    return "Error\n";
                }
                catch (SQLException e) {
                    e.printStackTrace();
                    return "Error\n";
                }
            case 2:
                String query2 = "SELECT mail, password" +
                        "FROM user " +
                        "WHERE mail = '" + mail + "' AND password = '" + password + "'";
                try {
                    PreparedStatement prSt = dbConnection.prepareStatement(query2);
                    ResultSet result =  prSt.executeQuery();
                    if(result.next()) {
                        return "Success\n";
                    }
                    return "Error\n";
                }
                catch (SQLException e) {
                    e.printStackTrace();
                    return "Error\n";
                }
                default:
                    return "Error\n";
        }
    }

    //добавление (создание) профиля пользователя
    public String NewUser(String username,
                          long telephone,
                          String mail,
                          String password) {
        try {
            String query = "INSERT INTO user" +
                    "(username, telephone, mail, password)" +
                    "VALUES" +
                    "(?,?,?,?)";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setString(1, username);
            prSt.setLong(2, telephone);
            prSt.setString(3, mail);
            prSt.setString(4, password);
            //6 - рейтинг user'а - как присваивать???
            return "Success\n";
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "Error\n";
        }
    }

    //редактирование профиля пользователя
    public String EditUser (int userid,
                           String username,
                          long telephone,
                          String mail,
                          String password) {
        try {
            String query = "UPDATE user" +
                    "SET username = ?, telephone = ?," +
                    "mail = ?, password = ?" +
                    "WHERE id = ?";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            prSt.setString(1, username);
            prSt.setLong(2, telephone);
            prSt.setString(3, mail);
            prSt.setString(4, password);
            //6 - рейтинг user'а - как присваивать???
            return "Success\n";
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "Error\n";
        }
    }

    //создание игры
    public String Couching (int couchingid, int gametypeid,
                            int tournamentid, LocalDate date,
                            Time time, int played,
                            int rating, Time duration,
                            int achievment, String creatorcouching,
                            Point location) {

        try {
            String query = "INSERT INTO couching" +
                    "(couchingid, gametypeid, tournamentid, date, time," +
                    "played, rating, duration, achievment, creatorcouching, location)" +
                    "VALUES" +
                    "(?,?,?,?,?,?,?,?,?,?,?)";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            //1 - user id - продумать, как присваивать по порядку
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
            //prSt.set location???

            return "Success\n";
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "Error\n";
        }
    }

}
