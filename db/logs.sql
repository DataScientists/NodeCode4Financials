CREATE TABLE Logs
(
    APPLICATION VARCHAR(20) NULL,
    LOG_DATE   DATE      NOT NULL,
    LOGGER  VARCHAR(250)    NOT NULL,
    LOG_LEVEL   VARCHAR(10)    NOT NULL,
    MESSAGE VARCHAR(4000)  NOT NULL
);