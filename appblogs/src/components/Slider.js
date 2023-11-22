import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

let currentSlideIndex = 0;
let intervalId;

const width = Dimensions.get("window").width - 20;
export default function Slider({ data, title }) {
  const [dataRender, setDataRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });
  const flatList = useRef();
  const handleScrollTo = (index) => {
    flatList?.current?.scrollToIndex({ animated: false, index });
  };

  useEffect(() => {
    const length = dataRender?.length;
    //reset slide to first slide
    if (visibleSlideIndex === length - 1 && length) {
      handleScrollTo(1);
    }
    //reset slide to last slide
    if (visibleSlideIndex === 0 && length) {
      handleScrollTo(length - 2);
    }

    const lastSlide = currentSlideIndex === length - 1;
    const firstSlide = currentSlideIndex === 0;
    if (lastSlide && length) setActiveSlideIndex(0);
    else if (firstSlide && length) setActiveSlideIndex(length - 2);
    else setActiveSlideIndex(currentSlideIndex - 1);
  }, [visibleSlideIndex]);
  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataRender([...newData]);
  }, [data?.length]);
  const startSlider = () => {
    if (currentSlideIndex <= dataRender.length - 2) {
      intervalId = setInterval(() => {
        flatList.current?.scrollToIndex({
          animated: true,
          index: currentSlideIndex + 1,
        });
      }, 4000);
    } else {
      pauseSlider();
    }
  };
  const pauseSlider = () => {
    clearInterval(intervalId);
  };
  useEffect(() => {
    if (dataRender.length && flatList.current) {
      startSlider();
    }
  }, [dataRender?.length]);

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataRender([...newData]);
  }, [data?.length]);

  return (
    <View style={styles.container}>
      <View style={styles.sliderHeader}>
        <Text style={styles.titleHeader}>{title}</Text>
        <View style={styles.sliderContainer}>
          <SlideIndicators data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataRender}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item?.id + index}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged?.current}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                source={{ uri: item?.thumbnail }}
                style={styles.imageThumbnail}
              />
              <View style={{ width }}>
                <Text numberOfLines={2} style={styles.titleHeader}>
                  {item?.title}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const SlideIndicators = ({ data, activeSlideIndex }) =>
  data.map((item, index) => {
    return (
      <View
        key={item.id}
        style={[
          styles.slides,
          {
            backgroundColor:
              activeSlideIndex === index ? "#383838" : "transparent",
          },
        ]}
      />
    );
  });

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
  },
  sliderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  slides: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginLeft: 5,
  },
  titleHeader: { fontWeight: "700", color: "#383838", fontSize: 22 },
  sliderContainer: { flexDirection: "row", alignItems: "center" },
  imageThumbnail: { width, height: width / 1.7, borderRadius: 7 },
});
