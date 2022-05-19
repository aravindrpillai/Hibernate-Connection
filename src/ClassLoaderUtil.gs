package hibernate


/**
 * @author     : Aravind R Pillai
 * date        : 09 Sept 2017
 * description : Class Loader
 */
class ClassLoaderUtil {

  private var _loader : ClassLoader

  construct(){
    _loader = Thread.currentThread().ContextClassLoader
  }


  /**
   * description : Sets classloader
   */
  function setClassLoader(loader : ClassLoader){
    Thread.currentThread().ContextClassLoader = loader
  }



  /**
   * description : Restore CLassLoader
   */
  function restoreClassLoader(){
    Thread.currentThread().ContextClassLoader = _loader
  }



}