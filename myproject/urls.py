from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views

from accounts import views as accounts_views
from boards import views


urlpatterns = [

	url(r'^home$', views.BoardListView.as_view(), name='home'),
	url(r'^$', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
	url(r'^newload/$', views.NewLoadListView.as_view(), name='newload'),
	url(r'^admin/$', views.AdminListView.as_view(), name='admin'),
	url(r'^drivers/$', views.DriversListView.as_view(), name='drivers'),
	url(r'^customers/$', views.CustomersListView.as_view(), name='customers'),
	url(r'^terminal/$', views.TerminalListView.as_view(), name='terminal'),
	url(r'^invoice/$', views.InvoiceListView.as_view(), name='invoice'),
	url(r'^documents/$', views.DocumentsListView.as_view(), name='documents'),
	url(r'^signup/$', accounts_views.signup, name='signup'),
	url(r'^login/$', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
	url(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),
    url(r'^dashboard/$', views.Dashboard, name='dashboard'),
    url(r'^adddriver/$', views.Adddriver, name='adddriver'),
    url(r'^deletedriver/$', views.DeleteDriver, name='deletedriver'),
    url(r'^addcustomer/$', views.Addcustomer, name='addcustomer'),
    url(r'^deletecustomer/$', views.DeleteCustomer, name='deletecustomer'),
    #url(r'^updatecustomer/$', views.UpdateCustomer  , name='updatecustomer'),
    url(r'^addterminal/$', views.Addterminal, name='addterimal'),
    url(r'^deleteterminal/$', views.DeleteTerminal, name='deleteterminal'),
    url(r'^addnewload/$', views.Addnewload, name='addnewload'),
    url(r'^getPickupTerminals/$', views.getPickupTerminals, name='getPickupTerminals'),
    url(r'^newload/getCustomerId/$', views.getCustomerId, name='getCustomerId'),
    
    url(r'^reset/$',
        auth_views.PasswordResetView.as_view(
            template_name='password_reset.html',
            email_template_name='password_reset_email.html',
            subject_template_name='password_reset_subject.txt'
        ),
        name='password_reset'),
    url(r'^reset/done/$',
        auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'),
        name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'),
        name='password_reset_confirm'),
    url(r'^reset/complete/$',
        auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'),
        name='password_reset_complete'),

    url(r'^settings/account/$', accounts_views.UserUpdateView.as_view(), name='my_account'),
    url(r'^settings/password/$', auth_views.PasswordChangeView.as_view(template_name='password_change.html'),
        name='password_change'),
    url(r'^settings/password/done/$', auth_views.PasswordChangeDoneView.as_view(template_name='password_change_done.html'),
        name='password_change_done'),

    url(r'^boards/(?P<pk>\d+)/$', views.TopicListView.as_view(), name='board_topics'),
    url(r'^boards/(?P<pk>\d+)/new/$', views.new_topic, name='new_topic'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/$', views.PostListView.as_view(), name='topic_posts'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/reply/$', views.reply_topic, name='reply_topic'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/posts/(?P<post_pk>\d+)/edit/$',
        views.PostUpdateView.as_view(), name='edit_post'),
    url(r'^admin/', admin.site.urls),
]
