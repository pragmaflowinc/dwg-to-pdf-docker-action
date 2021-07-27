#!/bin/sh -l

echo "Hello $1"
ls -R
time=$(date)
echo "::set-output name=time::$time"