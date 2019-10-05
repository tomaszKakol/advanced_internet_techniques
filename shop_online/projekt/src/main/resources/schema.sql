DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS CART;
DROP SEQUENCE IF EXISTS S_ITEM;

create sequence S_ITEM START WITH 0;

/* Table: CART */
CREATE TABLE CART (
	ID 				    BIGINT           not null,
	NAME 				VARCHAR(150)     not null,
	QUANTITY            INT              not null,
	CAT_ID              BIGINT           not null,
	CONSTRAINT PK_ITEM PRIMARY KEY (ID)
);

/* Table: CATEGORY */
CREATE TABLE CATEGORY (
	ID 				    BIGINT           not null,
	NAME 				VARCHAR(150)     not null,
	CONSTRAINT PK_CATEGORY PRIMARY KEY (ID)
);