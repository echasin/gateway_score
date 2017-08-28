#REM Batch Deploy

#START Jhipster Registry in Blue Window with title
START  color 1F ^&^& cd D:\Github\apprefactory\jhipster-registry ^&^&  title Jhipster Registry ^&^& mvnw 
timeout /t 15

#START Gateway in Agua Window with title
START color 3F ^&^& cd D:\Github\apprefactory\gateways\gateway_score ^&^& title Gateway ^&^&  gradlew ^&^& title Gateway

#START Score in Red Window with title
START color 4F ^&^& cd D:\Github\apprefactory\score ^&^& title Score^&^&  gradlew ^&^& title Score
