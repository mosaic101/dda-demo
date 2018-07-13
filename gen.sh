#!/bin/bash

# subject
# 
# C (Country)
# ST (State)
# L (Locality)
# O (Organization)
# OU (Organizational Unit)
# CN (Common Name): localhost
# EMAIL (Email Address):  use emailAddress!

rm -rf ca.key ca.crt server.key server.csr server.crt client.key client.csr client.crt *.pem

#
# gen ca key and cert
#
openssl genrsa -out ca.key 4096
openssl req -new -x509 -days 365 -key ca.key -out ca.crt -subj '/C=CN/ST=shanghai/L=pudong/O=wisnuc/OU=ca/CN=localhost/emailAddress=nobody@localhost'
cp ca.key ca-key.pem
cp ca.crt ca-cert.pem

#
# gen server key/cert and sign with ca key
#

openssl genrsa -out server.key 1024
openssl req -new -key server.key -out server.csr -subj '/C=CN/ST=shanghai/L=pudong/O=wisnuc/OU=server/CN=localhost/emailAddress=nobody@localhost'
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt 
cp server.key server-key.pem
cp server.crt server-cert.pem


#
# gen client key/cert and sign with ca key
#
openssl genrsa -out client.key 1024
openssl req -new -key client.key -out client.csr -subj '/C=CN/ST=shanghai/L=pudong/O=wisnuc/OU=client/CN=localhost/emailAddress=nobody@localhost'
openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt 
cp client.key client-key.pem
cp client.crt client-cert.pem