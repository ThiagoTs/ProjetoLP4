/*Query para criar usuário e seus atributos*/
CREATE TABLE lp4.usuario (
	id INT NOT NULL AUTO_INCREMENT COMMENT 'id do usuário',
	nome varchar(100) NOT NULL COMMENT 'nome do usuario',
	email varchar(100) NOT NULL COMMENT 'email do usuario',
	senha varchar(255) NOT NULL COMMENT 'senha criptografada',
	secret varchar(100) COMMENT 'secret para fazre login',
	perfil INT NOT NULL COMMENT 'tipo de usuário: 1-admin, 2-professor, 3-aluno',
	CONSTRAINT usuario_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

ALTER TABLE lp4.usuario MODIFY COLUMN email varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'email do usuario' ;
ALTER TABLE lp4.usuario MODIFY COLUMN senha varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'senha criptografada' ;
ALTER TABLE lp4.usuario MODIFY COLUMN nome varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'nome do usuario' ;
ALTER TABLE lp4.usuario ADD CONSTRAINT usuario_UN UNIQUE KEY (email) ;
ALTER TABLE lp4.usuario ADD deletado BOOL NULL;

CREATE TABLE lp4.pergunta_resposta (
	id INT NOT NULL AUTO_INCREMENT COMMENT 'id da pergunta',
	pergunta text NOT NULL COMMENT 'Pergunta',
	respostas text NOT NULL COMMENT 'conjunto de respostas',
	categoria INT NOT NULL COMMENT 'identificador de categoria',
	deletado BOOL COMMENT 'cola se pergunta foi deletado logicamente',
	CONSTRAINT usuario_PK PRIMARY KEY (id)
)