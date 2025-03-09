from models.objetos.models import UsuarioResponse
from models.clasesDAO.AuthDAO import AuthDAO

class AuthController:
    @staticmethod
    def login(username: str, password: str) -> UsuarioResponse:
        """
        Authenticate a user by checking their username and password.
        """
        return AuthDAO.login(username, password)