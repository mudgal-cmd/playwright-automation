export{};

declare global{
  namespace PlaywrightTest {
    interface Matchers<R>{
      toBeNumber():R; // explicitely says that this toBeNumber() is a valid method and we're declaring this globally
    }
  }
}