FROM python:3

RUN apt update \
    && apt install -y \
    gdal-bin 

# tippecanoe用のinstall
RUN git clone https://github.com/mapbox/tippecanoe.git  \
    && cd tippecanoe \
    && make -j \
    && make install \
    && cd .. \
    && rm -rf tippecanoe


# wgrib2用のinstall
RUN apt install -y gfortran cmake
ENV FC=gfortran
ENV CC=gcc
RUN wget ftp://ftp.cpc.ncep.noaa.gov/wd51we/wgrib2/wgrib2.tgz \
    && tar -xvzf wgrib2.tgz \
    && cd grib2 \
    && make \
    && cd .. \
    && rm wgrib2.tgz \
    && mv grib2 /usr/local
ENV WGRIB2="/usr/local/grib2" 
ENV PATH="${WGRIB2}/wgrib2:${PATH}" 

WORKDIR /app

# pythonの設定
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

