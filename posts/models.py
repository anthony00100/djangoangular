from django.db import models
from authentication.models import Account

class Post(models.Model):
    author = models.ForeignKey(Account)
    # account can have many post objects, so set up many-to-one relation
    content = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __unicode__(self):
        return '{0}'.format(self.content)

    