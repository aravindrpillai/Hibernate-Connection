package hibernate

uses gw.util.concurrent.LockingLazyVar
uses org.hibernate.Session
uses org.hibernate.Transaction
uses org.hibernate.SessionFactory
uses org.hibernate.boot.registry.StandardServiceRegistryBuilder
uses org.hibernate.cfg.Configuration
uses org.slf4j.LoggerFactory

/**
 * @author     : Aravind R Pillai
 * date        : 09 Sept 2017
 * description : Database Util Class to connect with 3rdparty database | Hibernate
 */
class DatabaseUtil {

  private final var _dialect       = "org.hibernate.dialect.SQLServerDialect"
  private final var _driverClass   = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
  private final var _connectionUrl = "jdbc:sqlserver://localhost:1433;DatabaseName=INTDB"
  private final var _userName      = "username"
  private final var _password      = "password"

  private static var _lazyClassInstance = LockingLazyVar.make(\-> new DatabaseUtil())
  private var sessionFactory : SessionFactory = null
  private var logger = LoggerFactory.getLogger("DataBaseUtil")
  private static var session :  Session = null

  private construct(){
    this.sessionFactory = buildSessionFactory()
  }



  /**
   * description : Property returns the instance of this class | Singleton
   * @return     : DatabaseUtilInstance
   */
  static property get Instance() : DatabaseUtil{
    return _lazyClassInstance.get()
  }



  /**
   * description : Function creates session factory
   */
  private function buildSessionFactory():SessionFactory {

    var clsLoader = new ClassLoaderUtil()

    try {
      clsLoader.setClassLoader((DatabaseUtil.Type as Class).ClassLoader)

      if (sessionFactory == null) {
        var configuration = new Configuration()
            .setProperty("hibernate.dialect", _dialect)
            .setProperty("hibernate.connection.driver_class", _driverClass)
            .setProperty("hibernate.connection.url", _connectionUrl)
            .setProperty("hibernate.connection.username", _userName)
            .setProperty("hibernate.connection.password", _password)
            .setProperty("hibernate.show_sql", "true")
            .setProperty("hibernate.cache.use_query_cache", "false")
            .setProperty("hibernate.cache.use_second_level_cache", "false")

        addDTOClass(configuration)

        var serviceRegistryBuilder = new StandardServiceRegistryBuilder()
        serviceRegistryBuilder.applySettings(configuration.getProperties())
        var serviceRegistry = serviceRegistryBuilder.build()
        sessionFactory = configuration.buildSessionFactory(serviceRegistry)
      }
    } catch (ex:Throwable) {
      logger.error("Failed to create session factory \n Reason : ")
      ex.printStackTrace()
      throw ex
    }

    return sessionFactory
  }


  /**
   * description : Function to add DTO class to configuration
   * note        : Every DTO class created for integration purpose must be added here
   * @param      : Configuration instance
   */
  private function addDTOClass(config : Configuration){
    config.addAnnotatedClass(TestDTO)
  }



  /**
   * description : Function creates an active session
   * @return     : Active Session instance
   */
  public function openSession() : Session {
    return (session == null) ? sessionFactory.openSession() : session
  }


  /**
   * description : Function ends an active session
   */
  public function  closeCurrentSession() : void {
    if(session != null)
    if(session.isOpen())
      session.close()
  }


  /**
   * description : Function begins an active session
   */
  public function transaction() : Transaction {
    return openSession().beginTransaction()
  }


  /**
   * description : Function persists the data into DB table
   * @param      : DTO class instance
   */
  public function persist(entity: Object): Object {
    return openSession().save(entity)
  }


  /**
   * description : Function Updates DB table
   * @param      : DTO class instance
   */
  public function update(entity: Object): void {
    openSession().update(entity)
  }


  /**
   * description : Function to remove data from DB table
   * @param      : DTO class instance
   */
  public function remove(entity: Object) {
    openSession().delete(entity)
  }


  /**
   * description : Function commit the data and close the session
   */
  public function commitAndCloseSession() {
    transaction().commit()
    closeCurrentSession()
  }


  /**
   * description : Function to rollback the transaction
   */
  public function roleBackCurrentTransaction() {
    transaction().rollback()
  }


  /**
   * description : Function to close the session factory
   */
  public function closeSessionFactory() {
    this.sessionFactory.close()
  }

}