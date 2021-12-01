from ibm_db import connect,exec_immediate,fetch_assoc,num_rows
from json import loads
from datetime import datetime

connection = connect('DATABASE=BLUDB;'
                     'HOSTNAME=dashdb-txn-sbox-yp-lon02-06.services.eu-gb.bluemix.net;'  # 127.0.0.1 or localhost works if it's local
                     'PORT=50000;'
                     'PROTOCOL=TCPIP;'
                     'UID=kdv88126;'
                     'PWD=u^]&-*5qp&=r{4Kh;', '', '')

def results(command):
    ret = []
    result = fetch_assoc(command)
    while result:
        ret.append(result)
        result = fetch_assoc(command)
    return ret

print (datetime.now())

sql = "SELECT P.PATIENT_ID, OCCUPATION, AGE FROM KDV88126.VACCINE V JOIN KDV88126.PATIENT P ON V.PATIENT_ID = P.PATIENT_ID WHERE VACCINE_STATUS = 'REPORT_APPROVED';"
rows = results(exec_immediate(connection, sql))
print (rows)

with open ('score.json') as fd:
    weights = loads(fd.read())
#print weights

age_list = [int(x) for x in weights['AGE'].keys()]
age_list.sort()
#print age_list

for row in rows:
    score = 0
    #print row['OCCUPATION'].upper()
    #print weights['OCCUPATION'].keys()
    if row['OCCUPATION'].upper() in weights['OCCUPATION'].keys():
        #print "weigght of occupation {} is {}".format(row['OCCUPATION'],weights['OCCUPATION'])
        score = score + weights['OCCUPATION'][row['OCCUPATION'].upper()]
    for i in range(len(age_list)):
        #print age_list[i], row['AGE'], weights['AGE'][str(age_list[i - 1])]
        if age_list[i] > row['AGE']:
            #print age_list[i], row['AGE'], weights['AGE'][str(age_list[i - 1])]
            #print "weigght of age {} is {}".format(row['AGE'],weights['AGE'][str(age_list[i - 1])])
            score = score + weights['AGE'][str(age_list[i - 1])]
            break
    sql = "UPDATE KDV88126.PATIENT SET SCORE={0} WHERE PATIENT_ID={1}".format(score, row['PATIENT_ID'])
    stmt = exec_immediate(connection, sql)
    #print ("Number of affected rows: ", num_rows(stmt))
    sql = "UPDATE KDV88126.VACCINE SET VACCINE_STATUS = 'INITIATED' WHERE PATIENT_ID={0}".format(row['PATIENT_ID'])
    stmt = exec_immediate(connection, sql)
    #print ("Number of affected rows: ", num_rows(stmt))

print ("Updated {} rows.".format(len(rows)))