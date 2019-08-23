import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default Provision = () => {
    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: 'Roboto-Bold' }}>
                    Chào mừng Bạn đến với Chính sách bảo mật của HOCMAI
                </Text>
                <Text>
                    Chính sách Bảo mật này là một phần không thể tách rời với điều kiện sử dụng trang web của Hocmai.vn và công bố cách thức mà Công ty cổ phần Đầu tư và Dịch vụ Giáo dục (Sau đây gọi tắt là “HOCMAI”) thu thập, lưu trữ và xử lý thông tin hoặc dữ liệu cá nhân (“Thông tin cá nhân”) của các thành viên sử dụng website của HOCMAI: https://hocmai.vn(“Bạn”) HOCMAI cam kết sẽ bảo mật các Thông tin cá nhân của Bạn, sẽ nỗ lực hết sức và sử dụng các biện pháp thích hợp để các thông tin mà Bạn cung cấp cho HOCMAI trong quá trình sử dụng website này được bảo mật và bảo vệ khỏi sự truy cập trái phép. Tuy nhiên, HOCMAI không đảm bảo ngăn chặn được tất cả các truy cập trái phép.
                </Text>
                <Text style={{ fontFamily: 'Roboto-Bold' }}>
                    Chính sách bảo mật riêng tư của HOCMAI
                </Text>
                <Text>
                    Khi Bạn chia sẻ thông tin với HOCMAI, ví dụ như bằng cách tạo Tài khoản HOCMAI, HOCMAI có thể làm cho các sản phẩm, dịch vụ đó trở nên tốt hơn nữa, để cung cấp cho Bạn nhiều sản phẩm,dịch vụ tiện ích hơn. Khi Bạn sử dụng sản phẩm,dịch vụ của HOCMAI, HOCMAI muốn Bạn biết rõ cách HOCMAI đang sử dụng thông tin và cách Bạn có thể bảo vệ sự riêng tư của mình.
                </Text>
            </View>
        </ScrollView>
    );
}